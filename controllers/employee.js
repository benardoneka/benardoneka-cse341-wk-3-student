const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const mongoose = require("mongoose")


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

// #####################################################################################################
// mongoose.connect('mongodb://localhost/employee', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

const createEmployee = async (req, res, next) => {
  const data = req.body;
  console.log(data)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    await check("firstName", "First name is required").not().isEmpty().run(req);
    await check("lastName", "Last name is required").not().isEmpty().run(req);
    await check("email", "Email is required").not().isEmpty().run(req);
    await check("jobTitle", "Job Title is required").not().isEmpty().run(req);
    await check("department", "Department is required").not().isEmpty().run(req);
    await check("startDate", "Start date is required").not().isEmpty().run(req);
    await check("endDate", "Last name is required").not().isEmpty().run(req);
    await check("country", "Country is required").not().isEmpty().run(req);
    await check("city", "City is required").not().isEmpty().run(req);
    await check("street", "Street is required").not().isEmpty().run(req);
    await check("postcode", "Postcode is required").not().isEmpty().run(req);
    await check("phone", "Phone number is required").not().isEmpty().run(req);
    
  } catch (error) {
    // return res.status(400).json({ message: error.errors[0].msg});
    console.log(error)
  }

  //Check if user is already created in the database and if not then we will create the user
  const emailExists = await mongodb
  .getDb()
  .db("cse341-wk3-l05")
  .collection("employee")
  .findOne({email: req.body.email});

  if(emailExists) return res.status(400).send("Email already exist");

  //The password should meet a specified regular expression
  // const regularExpression = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[\S]{8,}$/;
  // if(!regularExpression.test(data.password)) return res.status(400)
  // .send("Invalid Password, At least one capital letter, one number and one special character with minimum length of 8 required");

  //Using bycryptjs to hash user password instead of storing in a plain text
  // const salt1 = await bcrypt.genSalt(10);
  // const hashPassword1 = await bcrypt.hash(req.body.password, salt1)
  // data.password = hashPassword1;
  
  // const salt2 = await bcrypt.genSalt(10);
  // const hashPassword2 = await bcrypt.hash(req.body.confirmPassword, salt2)
  // data.confirmPassword = hashPassword2;

  //Regular expression that only alows date format as this dd/mm/yyyy
  // const regulaDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
  // if(!regulaDate.test(data.birthday)) return res.status(400).send("Invalid date format! Enter in this formate dd/mm/yyyy")
  
  
  const result = await mongodb
    .getDb()
    .db("cse341-wk3-l05")
    .collection("employee")
    .insertOne(data)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      // res.status(200).json({result: "User has been successfully added"});
      res.render("/reuseFiles/sucess")
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create employee in MongoDB" });
    });
};

//Updating a field using put request API
const updateEmployee = async (req, res, next) => {
  const data = req.body;

  console.log(data)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors[0].msg)
    return res.status(400).json({ errors: errors.errors[0].msg });
  }
  
  try {
    const userId = new ObjectId(req.params.id);

    await check('firstName', 'First name is required').not().isEmpty().run(req);
    await check('lastName', 'Last name is required').not().isEmpty().run(req);
    await check('email', 'Email is required').not().isEmpty().run(req);
    await check('password', 'Password is required').not().isEmpty().run(req);
    await check('confirmPassword', 'Confirm password is required').not().isEmpty().run(req);

    const db = await mongodb.getDb();
    const collection = db.db("cse341-wk3-l05")
    .collection("employee");
    const filter = { _id: userId };
    const update = { $set: data };
    const options = { upsert: false };
    const result = await collection
    .updateOne(filter, update, options);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: `Employee not found by this Id No: ${userId }`});
    }

    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      .json({ message: `${result.modifiedCount} Employee records updated` }); 
  } catch (err) {
    return res.status(500).json({ message: "Could not update Employee in MongoDB" });
  }
}; 
// const updateEmployee = async (req, res, next) => {
//   const data = req.body;

//   console.log(data)

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors.errors[0].msg)
//     return res.status(400).json({ errors: errors.errors[0].msg });
//     // return res.status(400).send(errors.details[0].msg)
//   }
  
//   try {
    
//     const userId = new ObjectId(req.params.id);
//     // const data = req.body; 

//     await check('firstName', 'First name is required').not().isEmpty().run(req);
//     await check('lastName', 'Last name is required').not().isEmpty().run(req);
//     await check('email', 'Email is required').not().isEmpty().run(req);
//     await check('password', 'Password is required').not().isEmpty().run(req);
//     await check('confirmPassword', 'Confirm password is required').not().isEmpty().run(req);

//     const db = await mongodb.getDb();
//     const collection = db.db("cse341-wk3-l05")
//     .collection("employee");
//     const filter = { _id: userId };
//     const update = { $set: data };
//     const options = { upsert: false };
//     const result = await collection
//     .updateOne(filter, update, options);

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ message: `Employee not found by this Id No: ${userId }`});
//     }

//     res.setHeader("Content-Type", "application/json");
//     res
//       .status(200)
//       .json({ message: `${result.modifiedCount} Employee records updated` }); 
//   } catch (err) {
//     res.status(500).json({ message: "Could not update Employee in MongoDB" });
//     return res.status(400).json({ message: err.errors[0].msg});
//   }
// };

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


