const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

const employeeController = require("../controllers/employee");

router.get("/", employeeController.getAllEmployee);
router.post("/", employeeController.createEmployee);


module.exports = router;