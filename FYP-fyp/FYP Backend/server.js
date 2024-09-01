require('dotenv').config(); // Load environment variables

console.log("MONGO_URL:", process.env.MONGO_URL);  // Check if the MONGO_URL is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Check if the JWT_SECRET is loaded

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());

// Add this line to handle the strictQuery deprecation warning
mongoose.set('strictQuery', true);

const mongoUrl = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!mongoUrl) {
  throw new Error('MONGO_URL environment variable not defined');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not defined');
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Ensure body parser is used to parse JSON requests
app.use(express.json());

require("./Userdetails");
const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

// API for registration of Users
app.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body; // Added gender

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      gender, // Added gender
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

// API for user login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User doesn't exist!!" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

    return res.status(201).send({ status: "ok", data: token });
  } else {
    return res.send({ error: "Invalid password" });
  }
});

// API for fetching user data
app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

// API for updating user data
app.post("/updateuser", async (req, res) => {
  const { token, updatedData } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    await User.findOneAndUpdate({ email: useremail }, updatedData);

    return res.send({ status: "ok", message: "User data updated successfully" });
  } catch (error) {
    return res.send({ error: error });
  }
});

// Import the Event model schema
require("./EventDetails");
const Event = mongoose.model("Event");

// Define the route for creating events
app.post("/create-event", async (req, res) => {
  try {
    // Extract event data from request body
    const { title, description, date, isPublic } = req.body;

    // Create new event document
    await Event.create({
      title,
      description,
      date,
      isPublic,
    });

    // Send response indicating success
    res.send({ status: "ok", message: "Event created successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).send({ error: error.message });
  }
});

// API for getting all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.send({ status: "ok", data: events });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5001, () => {
  console.log("Node js server started.");
});

