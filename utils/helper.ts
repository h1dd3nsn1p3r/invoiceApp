import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Response helper.
 *
 * @since 1.0.0
 */
export const res = (statusCode: number = 200, body: any) => {
	return new Response(JSON.stringify(body), {
		headers: {
			"Content-Type": "application/json",
		},
		status: statusCode,
	});
};

/**
 * Create assets dir.
 * This is a DIR where we save all the invoices.
 *
 * @since 1.0.0
 */
export const createInvoiceDir = async () => {
	const root = path.join(__dirname, "../");
	const assetsDir = path.join(root, "assets");

	if (!fs.existsSync(assetsDir)) {
		fs.mkdir(assetsDir, (err) => {
			if (err) {
				throw new Error("Failed to create assets DIR!");
			}
			return true;
		});
	}

	return true;
};

/**
 * Create logs dir.
 * This is a DIR where we save all the logs.
 *
 * @since 1.0.0
 */
export const createLogDir = async () => {
	const logDir = path.join(__dirname, "logs");
	const errorFile = path.join(logDir, "error.log");

	if (!fs.existsSync(logDir)) {
		fs.mkdir(logDir, (err) => {
			if (err) {
				throw new Error("Failed to create logs DIR!");
			}
			return true;
		});
	}

	if (!fs.existsSync(errorFile)) {
		fs.writeFile(errorFile, "", (err) => {
			if (err) {
				throw new Error("Failed to create error.log file!");
			}
			return true;
		});
	}

	return true;
};

/**
 * Read file content async.
 *
 *
 * @since 1.0.0
 */
export const readFile = async (path: string): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				reject(err);
				return null;
			}

			resolve(data) as unknown as Buffer;
		});
	});
};

/**
 * Normalize incoming query params.
 * Expected param string: invoice-[1721]-1706616033797.pdf
 *
 * @param {string} param.
 * @returns {string} normalized query params.
 * @since 1.0.0
 */
export const normalizeQueryParam = (param: string): string | null => {
	if (!param || param.length === 0) {
		return null;
	}

	let data: string | null = null;

	// Trim the string.
	data = param.trim().toLowerCase();

	// Remove all the white spaces.
	data = data.replace(/\s+/g, "");

	// Check if the format is correct using regex.
	// Expected: invoice-[1721]-1706616033797.pdf
	const regex = /^invoice-\[(\d+)\]-\d+\.pdf$/g;

	if (!regex.test(data)) {
		return null;
	}

	return data;
};
