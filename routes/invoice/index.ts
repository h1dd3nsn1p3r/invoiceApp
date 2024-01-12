import { res } from "../../utils/helper";

/**
 * Default route handler.
 *
 * @since 1.0.0
 */
export default eventHandler(async (event) => {
	// https://localhost:3000/invoice/?pdf=invoice-[1721]-1705074735432.pdf

	/**
	 * Get params from the request.
	 */
	const req = event.path;
	const params = req.split("?")[1];

	return res(404, {
		status: "🚀 API is online! " + new Date(),
	});
});
