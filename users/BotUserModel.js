const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  first_name:String,
  username:String,
  chatID: String,
  date: Date,
  phone:String,
  map:String,
  step:{
    type:Number,
    default:0
  }

});
const BotUserModel = mongoose.model("BotUserModel", UserSchema);
module.exports = BotUserModel;