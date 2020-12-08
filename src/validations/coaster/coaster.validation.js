const Joi = require('joi');
const { objectId } = require('../custom.validation');

const getCoasterById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const getCoasterByName = {
  params: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const createCoaster = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    park: Joi.string(),
    model: Joi.string(),
    type: Joi.array().items(Joi.string()).min(1),
    country: Joi.string(),
    length: Joi.number().integer(),
    height: Joi.number().integer(),
    speed: Joi.number().integer(),
    inversions: Joi.number().integer(),
    gForce: Joi.number(),
    year: Joi.number().integer(),
  }),
};

const updateCoaster = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      park: Joi.string(),
      model: Joi.string(),
      type: Joi.array().items(Joi.string()).min(1),
      country: Joi.string(),
      length: Joi.number().integer(),
      height: Joi.number().integer(),
      speed: Joi.number().integer(),
      inversions: Joi.number().integer(),
      gForce: Joi.number(),
      year: Joi.number().integer(),
    })
    .min(1),
};

const deleteCoaster = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  getCoasterById,
  getCoasterByName,
  createCoaster,
  updateCoaster,
  deleteCoaster,
};
