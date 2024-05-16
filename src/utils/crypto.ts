import type { SupportedCryptoAlgorithms } from "bun";

/**
 * Get SHA1 hash.
 *
 * @param {string} str - The string to hash.
 * @param {SupportedCryptoAlgorithms}
 * @returns {string} The hashed string.
 * @since 2.0.0
 */
const getHash = (
	str: string,
	algo: SupportedCryptoAlgorithms = "sha1"
): string => {
	const hash = new Bun.CryptoHasher(algo);
	return hash.update(str).digest("hex");
};
