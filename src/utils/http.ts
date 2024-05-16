interface Res<T> {
	status: boolean;
	message: string;
	code?: string;
	error?: Record<string, any>;
	data?: T;
}

/**
 * HTTP Response.
 *
 * @param {number} status.
 * @param {any} data.
 * @returns {Promise<Response>}
 * @since 2.0.0
 */
export const res = <T>(
	status: number,
	data: Res<T>,
	headers: null | Record<string, string | string[]> = null
): Response => {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"content-type": "application/json",
		},
		...headers,
	});
};

/**
 * CORS options.
 *
 * @returns {CORSOptions}
 * @since 2.0.0
 */
export const corsOption = (): any => {
	return {
		origin: "*",
		allowMethods: ["GET", "POST"],
		allowHeaders: ["Content-Type"],
		maxAge: 86400,
		credentials: false,
		exposeHeaders: [],
	};
};
