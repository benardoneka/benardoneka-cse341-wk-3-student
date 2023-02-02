const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());


router.get('/login', (req, res) => {
  res.render("login", {
    layout: 'login'
  })
})

router.get('/dashboard', (req, res) => {
  res.render("dashboard")
})






const employeeController = require("../controllers/employee");
const { check, validationResult } = require('express-validator');

router.get("/getdata", employeeController.getAllEmployee);

router.post("/postdata", [
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


module.exports = router;
