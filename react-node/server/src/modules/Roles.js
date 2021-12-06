import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  roleType: {
    type: String,
  },
});

export const Roles = mongoose.model("roles", RoleSchema);
