import fs from "fs";
import path from "path";

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
	const __dirname = path.resolve();
	const assetsDir = path.join(__dirname, "assets");
	const logDir = path.join(__dirname, "logs");

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
	const __dirname = path.resolve();
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
