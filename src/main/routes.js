const { Router } = require("express");
const validate = require("express-validation");
// const validation = require('./test/validation/login.js');

const { CreatePDF, OptionsPDF } = require("./pdf-service");

const router = Router();
router.post("/", async function(req, res, next) {
  const payload = res.body;
  const pdfBuffer = CreatePDF(payload);
  res.writeHead(200, { "Content-type": "application/pdf" });
  res.end(pdfBuffer);
});

module.exports = router;

// .response(channel)
// .type('text/event-stream; charset=utf-8')
// .header('Content-Encoding', 'none')
