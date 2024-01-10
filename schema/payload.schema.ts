import z from "zod";

const companyInfoSchema = z.object({
	logo: z.string().optional(),
	name: z.string(),
	address: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
	website: z.string().optional(),
	taxId: z.string().optional(),
});

const invoiceInfoSchema = z.object({
	number: z.string().or(z.number().positive()),
	date: z.string().optional(),
	dueDate: z.string().optional(),
	status: z.string().optional(),
	currency: z.string().optional(),
	path: z.string(),
});

const customerInfoSchema = z.object({
	name: z.string(),
	company: z.string().optional(),
	address: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
	taxId: z.string().optional(),
});

const InvoiceItemSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	price: z.number(),
	tax: z.number().optional(),
});

const qrInfoSchema = z.object({
	data: z.string(),
	width: z.number().default(50),
});

const notesInfoSchema = z.object({
	text: z.string(),
	italic: z.boolean().optional(),
});

export const invoicePayLoadSchema = z.object({
	company: companyInfoSchema,
	customer: customerInfoSchema,
	invoice: invoiceInfoSchema,
	items: z.array(InvoiceItemSchema),
	qr: qrInfoSchema,
	note: notesInfoSchema,
});

export type InvoicePayLoad = z.infer<typeof invoicePayLoadSchema>;
