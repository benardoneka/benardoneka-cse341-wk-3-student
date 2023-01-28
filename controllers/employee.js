const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


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

// Using a post request
const createEmployee = async (req, res, next) => {
    const data = req.body;
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
        res.status(500).json({ err: "Could not create contact mongodb!" });
      });
  };


  module.exports = {
    getAllEmployee,
    createEmployee

  };