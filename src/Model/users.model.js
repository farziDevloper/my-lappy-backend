const mongoose = require("mongoose");

const allUsersSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, unique: false },
    last_name: { type: String, required: true },
    email: { type: String, required: [true, "Can't be Empty"], unique: true },
    gender: { type: String, required: true },
    mobile: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("allUser", allUsersSchema);
