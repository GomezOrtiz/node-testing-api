const faker = require('faker');
const { Coaster } = require('../../../src/models');

describe('Coaster model', () => {
  describe('Coaster validation', () => {
    let newCoaster;
    beforeEach(() => {
      newCoaster = {
        name: 'New coaster',
        park: 'New park',
        model: 'New model',
        type: ['New type', 'Second new type'],
        country: faker.address.country(),
        length: faker.random.number({ min: 350, max: 3000 }),
        height: faker.random.number({ min: 10, max: 150 }),
        speed: faker.random.number({ min: 40, max: 250 }),
        inversions: faker.random.number({ min: 0, max: 15 }),
        gForce: faker.random.float({ min: 3.5, max: 5, precision: 1 }),
        year: faker.date.past(50).getFullYear(),
      };
    });

    test('should correctly validate a valid coaster', async () => {
      await expect(new Coaster(newCoaster).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is empty', async () => {
      newCoaster.name = '';
      await expect(new Coaster(newCoaster).validate()).rejects.toThrow();
    });

    test('should throw a validation error if year is after current year', async () => {
      newCoaster.year = new Date().getFullYear() + 1;
      await expect(new Coaster(newCoaster).validate()).rejects.toThrow();
    });
  });
});
