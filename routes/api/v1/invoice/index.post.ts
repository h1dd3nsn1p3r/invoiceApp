import dotenv from "dotenv";
import { Invoice } from "../../../../controller/invoice.controller";
import { res } from "../../../../utils/helper";

dotenv.config();

/**
 * Handle the incoming request.
 * Endpoint: POST /api/v1/invoice HTTP/1.1
 *
 * @since 1.0.0
 */
export default defineEventHandler(async (event) => {
	const content = await readBody(event);

	if (!content || content.length === 0) {
		return res(400, {
			success: false,
			code: 400,
			message: "🚨 Error: the request body is empty!",
		});
	}

	/**
	 * Create a new invoice.
	 *
	 * @since 1.0.0
	 */
	try {
		const invoice = new Invoice(content);
		const pdfFile = await invoice.create();

		if (!pdfFile) {
			throw new Error("Failed to create a new invoice!");
		}

		const env = process.env.APP_URL || "https://invoice.creamcode.com.np";

		const url = env + "/invoice/?pdf=" + pdfFile;

		return res(200, {
			success: true,
			code: 200,
			message: "🎉 Invoice created successfully!",
			link: url,
		});
	} catch (err) {
		return res(500, {
			success: false,
			code: 500,
			message:
				"🚨 Oops! something went wrong. Failed to create a invoice.",
			errors: err,
		});
	}
});
