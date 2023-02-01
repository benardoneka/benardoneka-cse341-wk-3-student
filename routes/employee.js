const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const employeeController = require("../controllers/employee");
app.use(express.static('static'));
const path = require('path');
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"))
})





router.get("/", employeeController.getAllEmployee);

router.post("/", [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    // check('password', 'Password is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'male', 'Female', 'female']),
    check('birthday', 'Birthday is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('semester', 'Semester is required').not().isEmpty(),
    check('grade', 'Grade is required').not().isEmpty(),
  ], employeeController.createEmployee);

router.put("/:id", [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'male', 'Female', 'female']),
    check('birthday', 'Birthday is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('semester', 'Semester is required').not().isEmpty(),
    check('grade', 'Grade is required').not().isEmpty(),
], employeeController.updateEmployee);

router.delete("/:id", employeeController.deleteEmployee);


module.exports = router, app;