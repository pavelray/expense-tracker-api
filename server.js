const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });

const { DB_URL, DB_PASS } = require("./utils/constants");

const port = process.env.PORT || 5001;

const DB = DB_URL.replace("<PASSWORD>", DB_PASS);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log(`Error While connecting DB : ${err}`);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
