/**
 * Catch all route handler.
 * Respond code: 404
 *
 * @since 1.0.0
 */
export default defineEventHandler((event) => {
	setResponseStatus(event, 404);
	return {
		success: false,
		code: 404,
		message:
			"🚨 Oops! the endpoint that you are trying to access doesn't exists.",
	};
});
