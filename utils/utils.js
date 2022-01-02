exports.catchAsync = (executeFunction) => {
  return (req, res, next) => {
    executeFunction(req, res, next).catch(next);
  };
};
