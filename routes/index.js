const express = require("express");
const router = express.Router();

// router.use("/", require("./swagger"));
router.use("/employee", require("./employee"));

module.exports = router;