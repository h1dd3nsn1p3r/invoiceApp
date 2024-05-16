import "dotenv/config";
import { Hono, type Context } from "hono";
import { res, corsOption } from "@util/http";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { invoiceEndpoint } from "@api/invoice";
import { HTTPException } from "hono/http-exception";

const app = new Hono({ strict: true });

app.use("*", cors(corsOption()));
app.use("*", secureHeaders());

if (process.env.NODE_ENV !== "production") {
	app.use("*", logger());
}

/**
 * Register all routes and endpoints.
 *
 * @since 2.0.0
 */
app.get("/", async (c: Context) => {
	return c.json({
		status: true,
		message: "🚀 API is working! " + new Date().getTime(),
		documentation: "https://github.com/h1dd3nsn1p3r/pdf-invoice-api/",
	});
});

app.route("/", invoiceEndpoint);

app.notFound(() => {
	return res(404, {
		status: false,
		message: "Oops! this route doesn't exists.",
	});
});

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		const code = err.status || 503;
		return res(code, {
			status: false,
			message: err.message || "Oops! something went wrong.",
		});
	} else {
		return res(500, {
			status: false,
			message: "Oops! Internal server error, something went wrong.",
		});
	}
});

/**
 * Run the server.
 *
 * @since 2.0.0
 */
console.log(`🎉 Server is running on port ${process.env.PORT || 3000}!`);
export default {
	fetch: app.fetch,
	port: process.env.PORT || 3000,
};
