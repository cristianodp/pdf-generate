const functions = require('firebase-functions');
const { PdfGenereteService } = require("./pdf-service");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createPDF = functions.https.onRequest((request, response) => PdfGenereteService(request,response));
