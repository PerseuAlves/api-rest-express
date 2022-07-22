const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    approved: { type: Boolean, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;