import { res } from "../utils/helper";

/**
 * Default route handler.
 *
 * @since 1.0.0
 */
export default eventHandler(() => {
	return res(404, {
		status: "🚀 API is online! " + new Date(),
	});
});
