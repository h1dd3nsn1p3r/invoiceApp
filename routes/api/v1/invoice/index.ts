//import { Invoice } from "../../../../controller/invoice.controller";

/**
 * Handle the incoming request.
 * Endpoint: POST /api/v1/invoice HTTP/1.1
 *
 * @since 1.0.0
 */
export default defineEventHandler(async (event) => {
	const method = event.method.toUpperCase();

	if (method !== "POST") {
		setResponseStatus(event, 405);
		return {
			success: false,
			code: 405,
			message: "🚨 Oops! only POST method is accepted!",
		};
	}

	setResponseStatus(event, 200);
	return {
		success: true,
		message: "🎉 Congrats! the invoice has been created.",
		data: "https://localhost:3000/api/v1/invoice/1234567890.pdf",
	};
});
