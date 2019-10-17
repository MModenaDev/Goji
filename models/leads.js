const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const leadsSchema = new Schema({
  email: {type: String, unique: true}  
},
{
  timestamps: true,
})

const Leads = mongoose.model("Leads", leadsSchema);
module.exports = Leads;