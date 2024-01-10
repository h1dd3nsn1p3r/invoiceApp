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
