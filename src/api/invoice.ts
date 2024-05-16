import { Hono } from "hono";
import { res } from "@util/http";
import { invoicePathToURL, readInvoice } from "@util/io";
import { Invoice } from "@server/invoice";
import type { Context } from "hono";

const api = new Hono();

/**
 * Handle GET request.
 *
 * HTTP GET "/invoice/:name"
 *
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} The response.
 * @since 2.0.0
 */
api.get("/invoice/:name", async (c: Context) => {
	const param = c.req.param("name");

	if (!param || !param.length) {
		return res(400, {
			status: false,
			message: "Failed! PDF file name is missing.",
		});
	}

	/**
	 * Sanitize incoming query params.
	 * Expected param string: invoice-[1721]-1706616033797.pdf
	 */
	const pdfName = param.trim().toLowerCase().replace(/\s+/g, "");

	const regex = /^invoice-\[\d+\]-\d+\.pdf$/;

	if (!pdfName || !pdfName.length || !regex.test(pdfName)) {
		return res(400, {
			status: false,
			message: "Failed! invalid PDF file name.",
		});
	}

	/**
	 * Read invoice file.
	 * Returns a Blob object.
	 */
	const data = await readInvoice(pdfName);

	if (!data) {
		return res(404, {
			status: false,
			message: "Failed! PDF file not found.",
		});
	}

	return new Response(data, {
		status: 200,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename=${pdfName}`,
		},
	});
});

/**
 * Handle POST request to create invoice.
 *
 * HTTP POST "/v1/invoice"
 *
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} The response.
 * @since 2.0.0
 */
api.post("/v1/invoice", async (c: Context) => {
	const data = await c.req.json();

	if (!data || !Object.keys(data).length) {
		return res(400, {
			status: false,
			message: "Failed! request body is missing.",
		});
	}

	/**
	 * Create invoice.
	 */
	const invoice = new Invoice(data);
	const pathToPDF = await invoice.write();

	if (!pathToPDF || !pathToPDF.length) {
		return res(503, {
			status: false,
			message: "Failed! to generate invoice.",
		});
	}

	console.log("PDF created. name is: " + pathToPDF);

	/**
	 * Generate URL.
	 */
	return res(200, {
		status: true,
		message: "🎉 Success, invoice created!",
		data: invoicePathToURL(pathToPDF),
	});
});

export const invoiceEndpoint = api;
