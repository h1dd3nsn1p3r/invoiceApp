import path from "path";
import { PDFInvoice } from "@h1dd3nsn1p3r/pdf-invoice";
import { createInvoiceDir } from "../utils/helper";
import type { InvoicePayLoad } from "../schema/payload.schema";

export class Invoice {
	payload: InvoicePayLoad;
	path: string;
	constructor(payload: InvoicePayLoad) {
		this.payload = payload;

		// Get the current directory.
		const __dirname = path.resolve();
		this.path = path.join(__dirname, "assets");
	}

	async create() {
		/**
		 * Create required directories.
		 */
		await createInvoiceDir();

		/**
		 * Create a new invoice.
		 */
		const timestamp = new Date().getTime();
		const name = `invoice-[${
			this.payload.invoice.number || timestamp
		}]-${timestamp}.pdf`;

		const pdf = path.join(this.path, name);

		/**
		 * Modify the payload.
		 * Include the path where we want to save the invoice.
		 */
		this.payload.invoice.path = pdf;

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
