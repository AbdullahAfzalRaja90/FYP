const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: String, // Added gender field
  },
  { collection: "UserInfo" }
);

mongoose.model("UserInfo", UserDetailsSchema);



