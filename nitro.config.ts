//https://nitro.unjs.io/config
export default defineNitroConfig({
	compressPublicAssets: {
		brotli: true,
		gzip: true,
	},
	runtimeConfig: {
		APP_URL: process.env.NITRO_APP_URL,
	},
});
