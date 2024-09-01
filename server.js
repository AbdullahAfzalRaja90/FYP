require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.set('strictQuery', true);

if (!mongoUrl) {
  throw new Error('MONGO_URL environment variable not defined');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not defined');
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Database Connected');
  })
  .catch((e) => {
    console.log(e);
  });

// Register models
require('./UserDetails'); // Ensure this line is here and before any use of the User model
require('./EventDetails');
require('./EventMembership');

const User = mongoose.model('UserInfo'); // Ensure UserInfo is the registered model name
const Event = mongoose.model('Event');
const EventMembership = mongoose.model('EventMembership');

app.get('/', (req, res) => {
  res.send({ status: 'Started' });
});

// API for registration of Users
app.post('/register', async (req, res) => {
  const { name, email, password, gender } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.send({ data: 'User already exists!!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });
    res.send({ status: 'ok', data: 'User Created' });
  } catch (error) {
    res.send({ status: 'error', data: error });
  }
});

// API for user login
app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.send({ error: "User doesn't exist!!" });
    }

    if (await bcrypt.compare(password, oldUser.password)) {
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, JWT_SECRET); // Added user ID to token
      return res.status(201).send({ status: 'ok', data: token });
    } else {
      return res.send({ error: 'Invalid password' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// API for fetching user data
app.post('/userdata', async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: 'ok', data });
    });
  } catch (error) {
    return res.send({ error });
  }
});

// API for updating user data
app.post('/updateuser', async (req, res) => {
  const { token, updatedData } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    await User.findOneAndUpdate({ email: useremail }, updatedData);

    return res.send({ status: 'ok', message: 'User data updated successfully' });
  } catch (error) {
    return res.send({ error });
  }
});

// Define the route for creating events
app.post('/create-event', async (req, res) => {
  try {
    const { title, description, date, isPublic } = req.body;

    await Event.create({
      title,
      description,
      date,
      isPublic,
    });

    res.send({ status: 'ok', message: 'Event created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API for getting all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.send({ status: 'ok', data: events });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Fetch event details by ID
app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ error: 'Event not found' });
    }
    res.send({ status: 'ok', data: event });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Fetch members of an event by event ID
app.get('/events/:id/members', async (req, res) => {
  try {
    const memberships = await EventMembership.find({ eventId: req.params.id }).populate('userId');
    if (!memberships) {
      return res.status(404).send({ error: 'No members found' });
    }
    const members = memberships.map(membership => membership.userId);
    res.send({ status: 'ok', data: members });
  } catch (error) {
    console.error('Error fetching event members:', error.stack); // Enhanced logging to include stack trace
    res.status(500).send({ error: error.message });
  }
});

// Join an event
app.post('/events/:id/join', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }
  
  const token = authHeader.split(' ')[1]; // Extract the token
  
  try {
    const userPayload = jwt.verify(token, JWT_SECRET);
    const useremail = userPayload.email;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).send({ error: 'Event not found' });
    }

    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const existingMembership = await EventMembership.findOne({ eventId: event._id, userId: user._id });
    if (existingMembership) {
      return res.send({ status: 'ok', message: 'Already joined the event' });
    }

    await EventMembership.create({ eventId: event._id, userId: user._id });

    res.send({ status: 'ok', message: 'Joined event successfully' });
  } catch (error) {
    console.error('Error joining the event:', error.stack); // Enhanced logging to include stack trace
    res.status(500).send({ error: error.message });
  }
});

app.listen(5001, () => {
  console.log('Node js server started.');
});
