const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const rp = require("request-promise");

async function CreatePDF(variables) {
    const templateHtml = await rp(variables.template).then(
        htmlString => htmlString
    );
    const templatePDF = handlebars.compile(templateHtml);
    const html = templatePDF(variables);
    //https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/docs/api.md#pagepdfoptions
    const options = { printBackground: true };

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: "networkidle0"
    });

    return await page.pdf(options);
}

const PdfGenereteService = (req, res) => {
    const payload = req.body;
    CreatePDF(payload)
        .then(response => {
            const pdfBuffer = response;
            res.writeHead(200, { "Content-type": "application/pdf" });
            return res.end(pdfBuffer);
            
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};

module.exports = { PdfGenereteService };
