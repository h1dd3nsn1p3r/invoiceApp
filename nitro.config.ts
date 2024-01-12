//https://nitro.unjs.io/config
export default defineNitroConfig({
	compressPublicAssets: {
		brotli: true,
		gzip: true,
	},
	runtimeConfig: {
		appUrl: process.env.APP_URL,
	},
	preset: "node-cluster",
});
