const express = require("express");
// const middleware  = require("./employee");
const router = express.Router();


router.use("/", require("./auth"));
router.use("/swagger", require("./swagger"));
router.use("/employee", require("./employee"));



module.exports = router;