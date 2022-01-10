const AppError = require("../models/appError");
const User = require("../models/user");
const { catchAsync } = require("../utils/utils");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne(id);

  if (!user) {
    return next(new AppError("No User found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;
  const user = await new User(name, email, password, confirmPassword).save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for Password update.", 400));
  }
  const user = await new User(name).update(id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.delete(id);
  if (!user) {
    return next(new AppError("No User found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
