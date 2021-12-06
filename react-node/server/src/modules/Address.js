import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: String,
  },
});

export const Address = mongoose.model("address", AddressSchema);
