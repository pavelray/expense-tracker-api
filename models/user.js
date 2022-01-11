const bcrypt = require("bcryptjs");
const UserModel = require("../schemas/user");
module.exports = class User {
  constructor(name, email, password, confirmPassword) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  async save() {
    const newUser = await UserModel.create(this);
    return newUser;
  }

  async update(id) {
    const newUser = await UserModel.findByIdAndUpdate(id, this, {
      new: true,
      runValidators: true,
    });
    return newUser;
  }

  static async findOne(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  static async findAll() {
    const user = await UserModel.find({});
    return user;
  }

  static async delete(id) {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }

  static async login(email, password){
    const user = UserModel.findOne({email}).select('+password');
    return user;
  }
  
  static async correctPassword(userPassword, enteredPassword){
    return bcrypt.compare(enteredPassword,userPassword);
  }
};
