import { Invoice } from "../../../../controller/invoice.controller";
import { res } from "../../../../utils/helper";
import { invoicePayLoadSchema } from "../../../../schema/payload.schema";

/**
 * Handle the incoming request.
 * Endpoint: POST /api/v1/invoice HTTP/1.1
 *
 * @since 1.0.0
 */
export default defineEventHandler(async (event) => {
	const method = event.method.toUpperCase();

	if (method !== "POST") {
		return res(405, {
			success: false,
			code: 405,
			message: "🚨 Oops! only POST method is accepted!",
		});
	}

	const content = await readBody(event);

	if (!content || content === "" || content.length === 0) {
		return res(400, {
			success: false,
			code: 400,
			message: "🚨 Error: the request body is empty!",
		});
	}

	/**
	 * Validate the request body with zod.
	 *
	 * @since 1.0.0
	 */
	const result = invoicePayLoadSchema.safeParse(content);

	if (!result.success) {
		// @ts-ignore
		const errors = result.error.issues.map((issue: ZodIssue) => {
			return {
				code: issue.code,
				message: issue.message,
				path: issue.path,
			};
		});

		return res(400, {
			success: false,
			code: 400,
			message: "🚨 Oops! the request body is not valid!",
			errors: errors,
		});
	}

	/**
	 * Validate the request body with zod.
	 *
	 * @since 1.0.0
	 */
	const invoice = new Invoice(result.data);
	await invoice
		.create()
		.then((result: any) => {
			return res(200, {
				success: true,
				message: "🎉 Congrats! the invoice has been created.",
				data: "https://localhost:3000/api/v1/invoice/1234567890.pdf",
			});
		})
		.catch((error: any) => {
			return res(400, {
				success: false,
				message: "Oops! something went wrong!",
				errors: error,
			});
		});
});
