const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const { check, validationResult } = require('express-validator');

const employeeController = require("../controllers/employee");



router.get('/', (req, res) => {
  res.render("login", {
    layout: 'login',
    title: "Login Form"
  })
})

router.get('/dashboard', (req, res) => {
  // console.log("Dashboard reached")
  res.render("dashboard")

})

router.get('/register', (req, res) => {
  // console.log("Register reached")
  res.render('register', 
  // { layout: "register",
  //   title: 'Registration Form' }
  );
});


router.get("/", employeeController.getAllEmployee);

router.post("/", [
  check('firstName').not().isEmpty().withMessage('First name is required'),
  check('lastName').not().isEmpty().withMessage('Last name is required'),
  check('email').not().isEmpty().withMessage('Email is required'),
  check('jobTitle').not().isEmpty().withMessage('Job Title is required'),
  check('department').not().isEmpty().withMessage('Department is required'),
  check('startDate').not().isEmpty().withMessage('Start date is required'),
  check('endDate').not().isEmpty().withMessage('Last name is required'),
  check('country').not().isEmpty().withMessage('Country is required'),
  check('city').not().isEmpty().withMessage('City is required'),
  check('street').not().isEmpty().withMessage('Street is required'),
  check('postcode').not().isEmpty().withMessage('Postcodeis required'),
  check('phone').not().isEmpty().withMessage('Phone number is required'),
  ], employeeController.createEmployee);

router.put("/:id", [
  check('firstName').not().isEmpty().withMessage('First name is required'),
  check('lastName').not().isEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').not().isEmpty().withMessage('Password is required'),
  check('confirmPassword').not().isEmpty().withMessage('Confirm password is required')

], employeeController.updateEmployee);

router.delete("/:id", employeeController.deleteEmployee);


module.exports = router;


