import fs from "fs";
import path from "path";
import util from "util";
import { res } from "../../utils/helper";

const readFile = util.promisify(fs.readFile);

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

	// Get the pdf file name.
	const pdf = params.split("pdf=")[1];

	// Check if the file exists.
	const __dirname = path.resolve();

	const pdfFile = path.join(__dirname, "assets", pdf);

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
			"Content-Disposition": `attachment; filename=${pdf}`,
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
