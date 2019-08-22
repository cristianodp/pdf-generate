const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const rp = require("request-promise");
const Joi = require("joi");

const Variables = {
  date: Joi.date().required(),
  template: Joi.string().required()
};

//https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/docs/api.md#pagepdfoptions
const options = {}

async function CreatePDF({ variables, template }) {

  const templateHtml = await rp(template).then(htmlString => htmlString);
  const templatePDF = handlebars.compile(templateHtml);
  const html = templatePDF(variables);

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

module.exports = { CreatePDF, Variables };
