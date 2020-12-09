const mongoose = require('mongoose');
const faker = require('faker');
const { Coaster } = require('../../src/models');

faker.locale = 'es';

const allCoasters = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'First coaster',
    park: 'First park',
    model: 'First model',
    type: ['First type', 'Second type'],
    country: faker.address.country(),
    length: faker.random.number({ min: 350, max: 3000 }),
    height: faker.random.number({ min: 10, max: 150 }),
    speed: faker.random.number({ min: 40, max: 250 }),
    inversions: faker.random.number({ min: 0, max: 15 }),
    gForce: faker.random.float({ min: 3.5, max: 5, precision: 1 }),
    year: faker.date.past(50).getFullYear(),
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Second coaster',
    park: 'First park',
    model: 'Second model',
    type: ['First type', 'Third type'],
    country: faker.address.country(),
    length: faker.random.number({ min: 350, max: 3000 }),
    height: faker.random.number({ min: 10, max: 150 }),
    speed: faker.random.number({ min: 40, max: 250 }),
    inversions: faker.random.number({ min: 0, max: 15 }),
    gForce: faker.random.float({ min: 3.5, max: 5, precision: 1 }),
    year: faker.date.past(50).getFullYear(),
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Third coaster',
    park: 'Second park',
    model: 'First model',
    type: ['Second type', 'Fourth type'],
    country: faker.address.country(),
    length: faker.random.number({ min: 350, max: 3000 }),
    height: faker.random.number({ min: 10, max: 150 }),
    speed: faker.random.number({ min: 40, max: 250 }),
    inversions: faker.random.number({ min: 0, max: 15 }),
    gForce: faker.random.float({ min: 3.5, max: 5, precision: 1 }),
    year: faker.date.past(50).getFullYear(),
  },
];

const insertCoaster = async (coaster) => {
  const insertedCoaster = await Coaster.create(coaster);
  return insertedCoaster.toJSON();
};

const insertCoasters = async (coasters) => {
  const insertedCoasters = await Coaster.insertMany(coasters);
  return insertedCoasters.map((coaster) => coaster.toJSON());
};

module.exports = {
  allCoasters,
  insertCoaster,
  insertCoasters,
};
