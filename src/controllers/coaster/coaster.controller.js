const httpStatus = require('http-status');
const coasterService = require('../../services/coaster/coaster.service');
const catchAsync = require('../../utils/catchAsync');

const getAllCoasters = catchAsync(async (req, res) => {
  const coasters = await coasterService.findAll();
  res.send(coasters);
});

const getCoasterById = catchAsync(async (req, res) => {
  const coaster = await coasterService.findById(req.params.id);
  res.send(coaster);
});

const getCoasterByName = catchAsync(async (req, res) => {
  const coaster = await coasterService.findByName(req.params.name);
  res.send(coaster);
});

const createCoaster = catchAsync(async (req, res) => {
  const { name, park, model, type, country, length, height, speed, inversions, gForce, year } = req.body;
  const coaster = await coasterService.create({
    name,
    park,
    model,
    type,
    country,
    length,
    height,
    speed,
    inversions,
    gForce,
    year,
  });
  res.status(httpStatus.CREATED).send(coaster);
});

const updateCoaster = catchAsync(async (req, res) => {
  const { name, park, model, type, country, length, height, speed, inversions, gForce, year } = req.body;
  const coaster = await coasterService.update(req.params.id, {
    name,
    park,
    model,
    type,
    country,
    length,
    height,
    speed,
    inversions,
    gForce,
    year,
  });
  res.send(coaster);
});

const deleteCoaster = catchAsync(async (req, res) => {
  await coasterService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllCoasters,
  getCoasterById,
  getCoasterByName,
  createCoaster,
  updateCoaster,
  deleteCoaster,
};
