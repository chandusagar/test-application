import bcrypt from "bcrypt";
import { Roles, Users, Address } from "../modules";

import { apiError, apiSuccess } from "../utilits/Errors";

const getUser = async (req, res) => {
  try {
    const result = await Users.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "_id",
          foreignField: "userId",
          as:"roles"
        }
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "userId",
          as:"address"
        }
      }
    ]);
    //  const roles = new Roles({ roleId: users._id });
    //  await roles.save();
    //  users.role.push(roles);
    //  await users.save();
    return apiSuccess("Records found", result, res);
  } catch (err) {
    apiError(res);
  }
};


const addUser = async (req, res) => {
  try {
    const data = req.body;
    if (data.password) {
      const encryptedPassword = await bcrypt.hash(data.password, 10);
     
      data.password = encryptedPassword;
    }
    const user = new Users({ ...data });
    await user.save();
    const roles = new Roles({ roleId: user._id });
    const address = new Address({ userId: user._id });
    await roles.save();
    await address.save();

    return apiSuccess("Records found", user, res);
  } catch (err) {
    apiError(res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      apiError(res);
    } else {
      return apiSuccess("Records found", user, res);
    }
  } catch (err) {
    apiError(res);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById({ _id: userId });
    if (!user) {
      apiError(res);
    } else {
      await Users.updateOne({ _id: userId }, { $set: req.body });
      return apiSuccess("Successfully updated user!", "", res);
    }
  } catch (err) {
    apiError(res);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      apiError(res);
    } else {
      await Users.remove({ _id: userId });
      return apiSuccess("Successfully Deleted User!", "", res);
    }
  } catch (err) {
    apiError(res);
  }
};

const fileUpload = async (req, res) => {
  try {
    console.log(req.file);

    return apiSuccess("Records found", res, res);
  } catch (err) {
    apiError(res);
  }
};

export { getUser, addUser, getUserById, updateUser, deleteUser, fileUpload };
