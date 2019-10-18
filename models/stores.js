const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const storesSchema = new Schema({
  adress: String,
  location: { type: { type: String }, coordinates: [Number] } // coordinates [longitude, latitude]
},
{
  timestamps: true,
})
storesSchema.index({ location: '2dsphere' });

const Stores = mongoose.model("Stores", storesSchema);
module.exports = Stores;