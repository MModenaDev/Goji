const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const leadsSchema = new Schema({
  name: String,
  email: String,  
},
{
  timestamps: true,
})

const Leads = mongoose.model("Leads", leadsSchema);
module.exports = Leads;