swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Employee Data API",
    description: "Employee",
  },
  host: "http://localhost:8080",
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