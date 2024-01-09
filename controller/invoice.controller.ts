import path from "path";
import { PDFInvoice } from "@h1dd3nsn1p3r/pdf-invoice";
import type { InvoicePayLoad } from "@h1dd3nsn1p3r/pdf-invoice/global";

export class Invoice {
	private payload: InvoicePayLoad;
	private path: string;
	constructor(payload: InvoicePayLoad) {
		this.payload = payload;
		this.path = path.join(__dirname, "/assets/");
	}

	async create() {
		const invoice = new PDFInvoice(this.payload);
		const buffer = await invoice.create();
		return buffer;
	}
}
