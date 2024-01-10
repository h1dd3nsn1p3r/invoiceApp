import { res } from "../utils/helper";

/**
 * Catch all route handler.
 * Respond code: 404
 *
 * @since 1.0.0
 */
export default defineEventHandler((event) => {
	return res(404, {
		success: false,
		code: 404,
		message: "🚨 Oops! requested endpoint doesn't exists.",
	});
});
