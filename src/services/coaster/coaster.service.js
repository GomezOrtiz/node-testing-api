const httpStatus = require('http-status');
const Coaster = require('../../models/coaster/coaster.model');
const ApiError = require('../../utils/ApiError');

const findAll = async () => {
  return Coaster.find();
};

const findById = async (id) => {
  const coaster = await Coaster.findById(id);
  if (!coaster) {
    throw new ApiError(httpStatus.NOT_FOUND, `A coaster with id ${id} could not be found`);
  }
  return coaster;
};

const findByName = async (name) => {
  const coaster = await Coaster.findOne({ name });
  if (!coaster) {
    throw new ApiError(httpStatus.NOT_FOUND, `A coaster with name ${name} could not be found`);
  }
  return coaster;
};

const create = async (createReq) => {
  if (await Coaster.isNameTaken(createReq.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `A coaster with name ${createReq.name} already exists`);
  }
  const coaster = await Coaster.create(createReq);
  return coaster;
};

const update = async (id, updateReq) => {
  const coaster = await findById(id);
  if (updateReq.name && updateReq.name !== coaster.name && (await Coaster.isNameTaken(updateReq.name))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `A coaster with name ${updateReq.name} already exists`);
  }
  Object.assign(coaster, updateReq);
  await coaster.save();
  return coaster;
};

const deleteById = async (id) => {
  const coaster = await findById(id);
  coaster.remove();
};

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  deleteById,
};
