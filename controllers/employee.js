const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require('express-validator');


const getAllEmployee = async (req, res, next) => {
    const result = await mongodb
      .getDb()
      .db("cse341-wk3-l05")
      .collection("employee")
      .find();
    result.toArray().then((lists) => {
      // console.log(lists)
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists); // we just need the first one (the only one)
    });
  };

// Function that uses post request to create an employee record
const createEmployee = async (req, res, next) => {
  const data = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    await check('firstName', 'First name is required').not().isEmpty().run(req);
    await check('lastName', 'Last name is required').not().isEmpty().run(req);
    await check('email', 'Email is required').not().isEmpty().run(req);
    // await check('password', 'Password is required').not().isEmpty().run(req.body.hashPassword);
    await check('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'male', 'Female', 'female']).run(req);
    await check('birthday', 'Birthday is required').not().isEmpty().run(req);
    await check('age', 'Age is required').not().isEmpty().run(req);
    await check('year', 'Year is required').not().isEmpty().run(req);
    await check('semester', 'Semester is required').not().isEmpty().run(req);
    await check('grade', 'Grade is required').not().isEmpty().run(req);
  } catch (error) {
    return res.status(400).json({ message: error.errors[0].msg});
  }

  //Check if user is already created in the database and if not then we will create the user
  const emailExists = await mongodb
  .getDb()
  .db("cse341-wk3-l05")
  .collection("employee")
  .findOne({email: req.body.email});

  if(emailExists) return res.status(400).send("Email already exist");

  //The password should meet a specified regular expression
  const regularExpression = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[\S]{8,}$/;
  if(!regularExpression.test(data.password)) return res.status(400)
  .send("Invalid Password, At least one capital letter, one number and one special character with minimum length of 8 required");

  //Using bycryptjs to hash user password instead of storing in a plain text
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(req.body.password, salt)
  data.password = hashPassword;


  //Regular expression that only alows date format as this dd/mm/yyyy
  const regulaDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
  if(!regulaDate.test(data.birthday)) return res.status(400).send("Invalid date format! Enter in this formate dd/mm/yyyy")
  
  
  const result = await mongodb
    .getDb()
    .db("cse341-wk3-l05")
    .collection("employee")
    .insertOne(data)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({result: "User has been successfully added"});
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create employee in MongoDB" });
    });
};

//Updating a field using put request API
const updateEmployee = async (req, res, next) => {
  const data = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors[0].msg)
    return res.status(400).json({ errors: errors.errors[0].msg });
    // return res.status(400).send(errors.details[0].msg)
  }
  
  try {
    
    const userId = new ObjectId(req.params.id);
    const data = req.body; 

    await check('firstName', 'First name is required').not().isEmpty().run(req);
    await check('lastName', 'Last name is required').not().isEmpty().run(req);
    await check('email', 'Email is required').not().isEmpty().run(req);
    await check('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'male', 'Female', 'female']).run(req);
    await check('birthday', 'Birthday is required').not().isEmpty().run(req);
    await check('age', 'Age is required').not().isEmpty().run(req);
    await check('year', 'Year is required').not().isEmpty().run(req);
    await check('semester', 'Semester is required').not().isEmpty().run(req);
    await check('grade', 'Grade is required').not().isEmpty().run(req);

    const db = await mongodb.getDb();
    const collection = db.db("cse341-wk3-l05").collection("employee");
    const filter = { _id: userId };
    const update = { $set: data };
    const options = { upsert: false };
    const result = await collection.updateOne(filter, update, options);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: `Employee not found by this Id No: ${userId }`});
    }

    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      .json({ message: `${result.modifiedCount} Employee records updated` }); 
  } catch (err) {
    res.status(500).json({ message: "Could not update Employee in MongoDB" });
    return res.status(400).json({ message: err.errors[0].msg});
  }
};

// Deleting a record using rest API
const deleteEmployee = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const db = await mongodb.getDb();
    const collection = db.db("cse341-wk3-l05").collection("employee");
    const filter = { _id: userId };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: `Employee record by this ID No: ${userId} not found` });
    }

    res.status(200).json({ message: `${result.deletedCount} Employee record by this ID No: ${userId} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete contact in MongoDB" });
  }
};


  module.exports = {
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee

  };