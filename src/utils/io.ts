import "dotenv/config";
import { resolve } from "path";
import { mkdir, exists, readFile } from "node:fs/promises";

/**
 * Create invoice directory.
 *
 * @returns {string} The path to the invoice directory.
 * @since 2.0.0
 */
export const createDir = async (): Promise<string | undefined> => {
	const cwd = import.meta.dir;
	const dir = resolve(cwd, ".invoice");

	if (await exists(dir)) {
		return dir;
	}

	return await mkdir(dir, { recursive: true });
};

/**
 * Read invoice file.
 *
 * @param {string} name - The name of the invoice file.
 * @returns {Promise<Blob | undefined>}
 * @since 2.0.0
 */
export const readInvoice = async (name: string): Promise<Blob | undefined> => {
	try {
		const dir = resolve(process.cwd(), ".invoice", name);

		const file = Bun.file(dir);

		const content = new Blob([file], { type: "application/pdf" });

		if (!content) {
			throw new Error("Failed!");
		}

		return content;
	} catch (e) {
		return;
	}
};

/**
 * Generate URL from invoice path.
 *
 * @param {string} name - The name of the invoice file.
 * @returns {string} The path to the invoice directory.
 * @since 2.0.0
 */
export const invoicePathToURL = (path: string): string => {
	const app = process.env.APP_URL || "http://localhost:3000";

	/**
	 * Get the file name.
	 * Unix based systems use `/` as path separator.
	 * Windows uses `\` as path separator.
	 */
	const name = path.split(/\\|\//).pop();

	return `${app}/invoice/${name}`;
};
