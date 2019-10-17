const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const storesSchema = new Schema({
  name: String,
  adress: String,
},
{
  timestamps: true,
})

const Stores = mongoose.model("Leads", storesSchema);
module.exports = Stores;