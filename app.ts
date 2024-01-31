import path from "path";
import { fileURLToPath } from "url";

/**
 * Function to get the root dir.
 * Using "../" instead of "./" because app actually runs inside,
 * ".nitro" directory during development and ".output" directory in production.
 *
 * @returns {string} root path.
 * @since 1.0.1
 */
export function baseDir(): string {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	/**
	 * Using "../" instead of "./" because app actually runs inside,
	 * ".nitro" directory during development and ".output" directory in production.
	 */
	return path.resolve(__dirname, "../");
}
