const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    name: err.name,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Return only trusted errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Showing a generic msg for all other errors in prod
    // console.log('Error:', err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong !",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // send prod error
    sendErrorProd(err, res);
  }
};
