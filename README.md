# PDF INVOICE (API)

🚀 Public API that generates PDF invoice, receipt & estimates created using [NodeJS](https://nodejs.org) & [Nitro Server](https://nitro.unjs.io/).

## Setup

1. Clone the repo.
2. Run `pnpm install` to install all the dependencies.
3. Run `pnpm run dev` to start the development server.

### Usage

Open API that generates invoice, receipt & estimates in PDF format. It accepts JSON data and returns PDF file.

### Check server status

To check the server status follow the below steps:

```sh
GET `https://invoice.creamcode.com.np/` HTTP/1.1
```

If you receive status code `200`, then the server is up and running.

### Generate PDF invoice

This API uses PDF Invoice generator by [Anuj Subedi](https://github.com/h1dd3nsn1p3r/pdf-invoice) under the hood to generate the PDF invoice. All the payload data is same except few changes.

```sh
POST `https://invoice.creamcode.com.np/api/v1/invoice` HTTP/1.1
```

Send the payload data to the above endpoint.

```json
const invoice = {
	.....,
	path: "....", // Not required!
}
```

The `path` key is not required in the payload data. The API will generate the PDF file and return the file in the response. Here's the same same response.

```json
{
	"success": true,
	"code": 200,
	"message": "🎉 Invoice created successfully!",
	"link": "https://invoice.creamcode.com.np/invoice/?pdf=invoice-[1721]-1705093211407.pdf",
}
```

The `link` key contains the link to the PDF file. You can use this link to download the PDF file.

## PDF Files

All generated PDF files will stay in the server for seven days. After seven days, the files will be deleted automatically.







