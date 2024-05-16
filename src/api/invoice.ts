import { Hono } from "hono";
import { res } from "@util/http";
import { sanitizeParam } from "@util/helper";
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
	const query = c.req.param("name");

	if (!query || !query.length) {
		return res(400, {
			status: false,
			message: "Failed! pdf file name is missing.",
		});
	}

	const param = sanitizeParam(query);

	if (!param) {
		return res(400, {
			status: false,
			message: "Failed! invalid pdf file name.",
		});
	}

	/**
	 * Read invoice file.
	 */
	const invoice = await readInvoice(param);

	if (!invoice || !invoice.length) {
		return res(404, {
			status: false,
			message: "Oops! invoice doesn't exists.",
		});
	}

	const headers = {
		"Content-Type": "application/pdf",
		"Content-Disposition": `attachment; filename=${param}`,
		"Content-Length": invoice.length.toString(),
	};

	return new Response(invoice, {
		status: 200,
		headers,
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
