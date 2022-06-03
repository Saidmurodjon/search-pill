const mongoose = require("mongoose");

// product uchun

const reportSchema = mongoose.Schema({
  userName: String,
  userFish: String,
  userlar: String,
  services: [Object],
  cilientFish: String,
  cilientBolim: String,
  cilientKabinet: String,
  tasdiq: Boolean,
  fullFData: Date,
  chatID: String,
  countYear: Number,
  countMonth: Number,
});

const ReportModel = mongoose.model("ReportModel", reportSchema);

module.exports = ReportModel;
