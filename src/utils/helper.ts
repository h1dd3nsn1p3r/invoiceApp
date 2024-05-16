/**
 * Sanitize incoming query params.
 * Expected param string: invoice-[1721]-1706616033797.pdf
 *
 * @param {string} param.
 * @returns {string} normalized query params.
 * @since 2.0.0
 */
export const sanitizeParam = (param: string): string | null => {
	if (!param || !param.length) {
		return null;
	}

	let query: string | null = null;

	// Trim the string.
	query = param.trim().toLowerCase();

	// Remove all the white spaces.
	query = query.replace(/\s+/g, "");

	/**
	 * Check if the format is correct using regex.
	 * Expected: invoice-[1721]-1706616033797.pdf
	 */
	const regex = /^invoice-\[\d+\]-\d+\.pdf$/;

	return regex.test(query) ? query : null;
};
