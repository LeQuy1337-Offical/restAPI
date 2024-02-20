const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String, required: true, unique: true
    },
    password: { type: String, required: true },
    location: { type: String, default: "Ha noi Viet Nam" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
