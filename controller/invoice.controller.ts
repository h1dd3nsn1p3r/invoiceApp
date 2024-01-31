import path from "path";
import { PDFInvoice } from "@h1dd3nsn1p3r/pdf-invoice";
import { createInvoiceDir } from "../utils/helper";
import type { InvoicePayLoad } from "../schema/payload.schema";
import { baseDir } from "../app";

export class Invoice {
	payload: InvoicePayLoad;
	path: string;
	constructor(payload: InvoicePayLoad) {
		this.payload = payload;
	}

	/**
	 * Create a new invoice.
	 *
	 * @returns {Promise<string | null>}
	 * @since 1.0.0
	 */
	async create(): Promise<string | null> {
		/**
		 * Create required directories.
		 */
		await createInvoiceDir().catch((err) => {
			return null;
		});

		/**
		 * Create a new invoice.
		 */
		const time = new Date().getTime();
		const name = `invoice-[${
			this.payload.invoice.number || time
		}]-${time}.pdf`;

		const pdf = path.join(baseDir(), "assets", name);

		/**
		 * Modify the payload.
		 * Include the path where we want to save the invoice.
		 */
		this.payload.invoice.path = pdf;

		//console.log("🎉 Created invoice in path: ", this.payload.invoice.path);

		try {
			// @ts-ignore
			const invoice = new PDFInvoice(this.payload);
			const result = await invoice.create();

			if (!result) {
				throw new Error("Failed to create a new invoice!");
			}

			return name;
		} catch (err: any) {
			throw Error(err);
		}
	}
}
