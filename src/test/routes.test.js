// const assert = require("assert");
// const api = require("../main/routes");
// let app = {};

// describe("API test suite", function() {
 

//   beforeEach(async () => {
//     app = await api;
//   });

//   it("generete PDF", async () => {
//     const result = await app.inject({
//       method: "POST",
//       url: "/",
//       payload: {
//         date: "2019-08-22",
//         template: "https://templates.cristianodp.now.sh"
//       }
//     });

//     const statusCode = result.statusCode;
//     assert.deepEqual(statusCode, 200);
//   });

//   afterEach(async () => {
//     await app.stop();
//   });
// });
