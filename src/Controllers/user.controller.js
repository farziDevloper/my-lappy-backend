const express = require("express");
const router = express.Router();

const User = require("../Model/users.model");

// this is an api to get list of all the user using get method
router.get("/", async (req, res) => {
  const user = await User.find({}).lean();
  let obj = {
    status: "SUCCESS",
    code: "0000",
    data: user,
  };
  res.send(obj);
});

// this is an API to find an Item using email id using get method

router.get("/:_id", async (req, res) => {
  try {
    let newData = await User.findById({ _id: req.params._id }).lean().exec();

    if (Object.keys(newData).length === 0) {
      newData = "NO DATA";
    }
    let obj = {
      status: "SUCCESS",
      code: "0000",
      data: newData,
    };
    return res.send(obj);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    // const newUser = [...Json, req.body];
    const user = await User.insertMany(req.body);
    let obj = {
      status: "SUCCESS",
      code: "0000",
      message: "DATA ADDED SUCCESSFULLY",
      data: user,
    };
    return res.status(200).send(obj);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});

router.patch("/:_id", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const update = await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(update);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});

router.delete("/:_id", async (req, res) => {
  const newData = await User.findOneAndDelete(req.params._id);
  res.status(200).json({ data: newData });
});

module.exports = router;
