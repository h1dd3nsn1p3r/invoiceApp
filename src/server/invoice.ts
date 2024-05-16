import { resolve } from "path";
import { mkdir, exists, readFile } from "node:fs/promises";
import { PDFInvoice } from "@h1dd3nsn1p3r/pdf-invoice";
import type { InvoicePayLoad } from "@h1dd3nsn1p3r/pdf-invoice/global.d.ts";

/**
 * Class that handles PDF invoice generation.
 *
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} The response.
 * @since 2.0.0
 */
export class Invoice {
	dir: string;
	data: InvoicePayLoad;
	constructor(data: InvoicePayLoad) {
		this.data = data;
		this.dir = resolve(process.cwd(), ".invoice");
	}

	/**
	 * Create invoice directory.
	 *
	 * @returns {string} - The path to the invoice directory.
	 * @since 2.0.0
	 */
	private async createDir(): Promise<string | undefined> {
		if (await exists(this.dir)) {
			return this.dir;
		}
		return await mkdir(this.dir, { recursive: true });
	}

	/**
	 * Get current timestamp in seconds.
	 *
	 * @returns {number} - The current timestamp in seconds.
	 * @since 2.0.0
	 */
	private timestamp(): number {
		return new Date().getTime() / 1000;
	}

	/**
	 * Create the invoice.
	 *
	 * @returns {string} - The path to the invoice directory.
	 * @since 2.0.0
	 */
	public async write(): Promise<string | undefined> {
		/**
		 * Create required directory.
		 */
		const dir = await this.createDir();

		if (!dir || !dir.length) {
			return;
		}

		/**
		 * File name and path.
		 */
		const ext = ".pdf";
		const time = new Date().getTime();
		const invoiceNo = this.data.invoice.number || this.timestamp();
		const name = "invoice-[" + invoiceNo + "]-" + time + ext;

		const pathToPDF = resolve(dir, name);

		Object.assign(this.data.invoice, {
			path: resolve(dir, pathToPDF),
		});

		console.log("Invoice path: " + pathToPDF);

		/**
		 * Create the PDF.
		 */
		try {
			const invoice = new PDFInvoice(this.data);
			const result = await invoice.create();

			if (!result || !result.length) {
				throw new Error("Failed to create PDF.");
			}

			return result;
		} catch (e: any) {
			return;
		}
	}
}
