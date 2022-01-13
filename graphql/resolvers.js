const jwt = require("jsonwebtoken");

const AppError = require("../models/appError");
const User = require("../models/user");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const exsistigUser = await User.login(userInput.email);
    if (exsistigUser) {
      const error = new AppError("User already exisits", 500);
      throw error;
    }
    const { name, email, password, confirmPassword } = userInput;
    const newUser = await new User(
      name,
      email,
      password,
      confirmPassword
    ).save();

    return {
      ...newUser._doc,
      _id: newUser._id.toString(),
    };
  },
  login: async function ({ email, password }, req) {
    if (!email || !password) {
      const error = new AppError(
        "Please enter email and password! Bad Request.",
        400
      );
      throw error;
    }
    const user = await User.login(email);

    if (!user && !User.correctPassword(user.password, password)) {
      const error = new AppError("Username or Password is incorrect!", 401);
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRECT, {
      expiresIn: `${process.env.JWT_TOKEN_EXPIRES}`,
    });
    user.password = undefined;
    return {
      token,
      user,
    };
  },
};
