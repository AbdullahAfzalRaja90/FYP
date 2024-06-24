// EventMembership.js
const mongoose = require('mongoose');

const EventMembershipSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }, // Ensure this matches the name registered in UserDetails.js
    joinedAt: { type: Date, default: Date.now }
  },
  { collection: 'EventMemberships' }
);

mongoose.model('EventMembership', EventMembershipSchema);
