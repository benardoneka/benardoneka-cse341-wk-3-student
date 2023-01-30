const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
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
    await check('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'male', 'Female', 'female']).run(req);
    await check('birthday', 'Birthday is required').not().isEmpty().run(req);
    await check('age', 'Age is required').not().isEmpty().run(req);
    await check('year', 'Year is required').not().isEmpty().run(req);
    await check('semester', 'Semester is required').not().isEmpty().run(req);
    await check('grade', 'Grade is required').not().isEmpty().run(req);
  } catch (error) {
    return res.status(400).json({ message: error.errors[0].msg});
  }

  const result = await mongodb
    .getDb()
    .db("cse341-wk3-l05")
    .collection("employee")
    .insertOne(data)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
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
    return res.status(400).json({ errors: errors.array() });
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