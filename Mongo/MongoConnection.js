const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://singh80020:56Q3oYCvbkQTBn2Y@my-lappy.p4sxzae.mongodb.net/"
    );
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
