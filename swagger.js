swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Employee Data API",
    description: "Employee",
  },
  host: "oneka-web-dev-wk-3-cse341-l06-api.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFile = ["./routes/swagger.js"];

// Generating a swagger json file
swaggerAutogen(outputFile, endpointsFile, doc);

//Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFile, doc).then(async () => {
//     await import('./index.js');
// })