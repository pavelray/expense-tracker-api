const {promisify} = require('util')

const AppError = require("../models/appError");

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils/utils");

const createSendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRECT, {
    expiresIn: `${process.env.JWT_TOKEN_EXPIRES}`,
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(
      new AppError("Bad request! Please provide email and password.", 400)
    );
  }

  const user = await User.login(email, password);

  if (!user && !(await User.correctPassword(user.password, password))) {
    return next(
      new AppError(
        "Email or Password is incorrect! Please enter correct email or password.",
        401
      )
    );
  }

  createSendToken(user, 201, req, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;
  const user = await new User(name, email, password, confirmPassword).save();

  // Send mail 
  // OTP verification

  createSendToken(user, 201, req, res);
});

exports.protectedRoute = catchAsync(async(req,res,next) => {
    let token;

    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('You are not authorized! Please login in.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRECT);

    const requestedUser = User.findOne(decoded.id);

    if(!requestedUser){
        return next(new AppError('User no longer exsists! Please sign up.', 401));
    }

    // Need to check password update 
    req.user = requestedUser;
    next();
});