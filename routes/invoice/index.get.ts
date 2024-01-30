import fs from "fs";
import util from "util";
import path from "path";
import { fileURLToPath } from "url";
import { res, normalizeQueryParam } from "../../utils/helper";

const readFile = util.promisify(fs.readFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Handle the incoming "GET" request.
 *
 * @since 1.0.0
 */
export default eventHandler(async (event) => {
	/**
	 * Get params from the request.
	 */
	const params = event.path;

	if (!params || !params.includes("pdf=")) {
		return res(400, {
			success: false,
			code: 400,
			message: "🚨 Invalid file name!",
		});
	}

	// Get the pdf file name from the params.
	const queryParam = params.split("pdf=")[1];

	// Normalize the query param.
	const query = normalizeQueryParam(queryParam);

	if (!query) {
		return res(400, {
			success: false,
			code: 400,
			message: "🚨 Invalid file name!",
		});
	}

	const pdfFile = path.join(__dirname, "../../assets/", query);

	if (!fs.existsSync(pdfFile)) {
		return res(404, {
			success: false,
			code: 404,
			message: "🚨 Sorry the invoice files doesn't exists!",
		});
	}

	/**
	 * Send the file to the client.
	 * Download the file.
	 */
	try {
		const data = await readFile(pdfFile);

		const headers = {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename=${query}`,
			"Content-Length": data.length.toString(),
		};

		return new Response(data, { headers });
	} catch (err) {
		res(500, {
			success: false,
			code: 500,
			message: "🚨 Failed to download the file!",
		});
	}
});
