const router = require("express").Router();
const swagerUi = require("swagger-ui-express");
const swagerDocument = require("../swagger.json");

router.use("/api-docs", swagerUi.serve);
router.get("/api-docs", swagerUi.setup(swagerDocument));

module.exports = router;