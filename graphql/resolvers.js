const AppError = require("../models/appError");
const User = require("../models/user")


module.exports = {
    createUser : async function({userInput}, req){
        const exsistigUser = await User.login(userInput.email);
        if(exsistigUser){
            const error = new AppError('User already exisits', 500);
            throw error;
        }
        const {name, email,password, confirmPassword} = userInput;
        const newUser = await new User(name,email,password,confirmPassword).save();

        return {
            ...newUser._doc,
            _id: newUser._id.toString()
        }
    }
}