import path from "path";
import { fileURLToPath } from "url";

/**
 * Function to get the root dir.
 *
 * @returns {string} root dir.
 * @since 1.0.1
 */
export function baseDir(): string {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return path.resolve(__dirname, "../");
}
