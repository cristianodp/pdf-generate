const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");

const app = Hapi.server({
  port: 3000
});

async function main() {
  const pdfParams = {
    date: Joi.date().required(),
    template: Joi.string().required()
  };

  app.route({
    method: "POST",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
    options: {
      validate: {
        payload: pdfParams
      }
    }
  });

  await app.start();
  console.log("Server running on %s", app.info.uri);

  return app;
}

module.exports = main();
