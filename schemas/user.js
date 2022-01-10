const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required! Please enter a name.']
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required! Please enter a Email.'],
        validate: [validator.isEmail, 'Please provide a valid Email address.']
    },
    password:{
        type: String,
        select: false,
        required: [true, 'Password is Required! Please enter a password.']
    },
    confirmPassword:{
        type: String,
        select: false,
        required: [true, 'Confirm Password is required! Please enter a confirm password.'],
        validate: function(el){
            return el === this.password
        },
        message: 'Password and Confirm Password should match!'
    },
    passwordUpdate: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
        type: Boolean,
        default: true,
        select: false
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
