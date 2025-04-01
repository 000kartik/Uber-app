const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,  // Fixed `require` → `required`
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,  // Fixed `require` → `required`
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,  // Fixed `require` → `required`
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,  // Fixed `require` → `required`
        select: false,
    },
    socketId: {  // Fixed `soketId` → `socketId`
        type: String,
    },
});

// Generate authentication token
userSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    return token;
};

// Compare password with hashed password
userSchema.methods.comparePassword = async function (password) {  // Fixed `method` → `methods`
    return await bcrypt.compare(password, this.password);
};

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {  // Fixed `static` → `statics`
    return await bcrypt.hash(password, 10);
};

// Export the model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
