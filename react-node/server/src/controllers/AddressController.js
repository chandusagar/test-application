import { Users, Address } from "../modules";
import { apiError, apiSuccess } from "../utilits/Errors";

export const address = {};

address.getList = async (req, res) => {
  try {
    const result = await Address.find({});
    console.log(result);
    return apiSuccess("Records Found", result, res);
  } catch (err) {
    apiError(res);
  }
};

address.create = async (req, res) => {
  try {
    let address = new Address({ ...req.body });
    await address.save();
    apiSuccess("Records Founds", address, res);

    
  } catch (err) {
    apiError(res);
    
  }
  
}

address.update = async (req, res) => {
  const id = req.params.id;
  try {
    await Address.updateOne({ _id: id }, { $set: req.body });
    return apiSuccess("Successfully updated address!", "", res);
  } catch (err) {
    apiError(res);
  }
};

address.deleteAddress = async (req, res) => {
  let Id = req.parems.id;
  try {
    let address = Address.findByOne({ _id: Id });
    if (!address) {
      apiError(res)
    } else {
      await Address.remove({_id:id});
    }
  } catch (err) {
    apiAddress(res);
  }
  
}



