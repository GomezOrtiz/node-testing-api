const request = require('supertest');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { allCoasters, insertCoaster, insertCoasters } = require('../fixtures/coaster.fixture');
const Coaster = require('../../src/models/coaster/coaster.model');

setupTestDB();

describe('Coaster routes', () => {
  describe('GET /v1/coasters', () => {
    test('should get all coasters and return 200', async () => {
      const expected = await insertCoasters(allCoasters);

      const res = await request(app).get('/v1/coasters').send().expect(httpStatus.OK);

      expect(res.body).toEqual(expected);
    });
  });

  describe('GET /v1/coasters/:id', () => {
    test('should get one coaster by id and return 200', async () => {
      const expected = await insertCoaster(allCoasters[0]);

      const res = await request(app).get(`/v1/coasters/${expected.id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual(expected);
    });

    test("should return 404 if coaster doesn't exist", async () => {
      const id = mongoose.Types.ObjectId();

      const res = await request(app).get(`/v1/coasters/${id}`).send().expect(httpStatus.NOT_FOUND);

      expect(res.body).toEqual({
        code: 404,
        message: `A coaster with id ${id} could not be found`,
      });
    });

    test('should return 400 if id is not valid', async () => {
      const id = 'notValid';

      const res = await request(app).get(`/v1/coasters/${id}`).send().expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        code: 400,
        message: '""id"" must be a valid mongo id',
      });
    });
  });

  describe('GET /v1/coasters/:name', () => {
    test('should get one coaster by name and return 200', async () => {
      const expected = await insertCoaster(allCoasters[0]);

      const res = await request(app).get(`/v1/coasters/name/${expected.name}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual(expected);
    });

    test("should return 404 if coaster doesn't exist", async () => {
      const name = 'Non existing';

      const res = await request(app).get(`/v1/coasters/name/${name}`).send().expect(httpStatus.NOT_FOUND);

      expect(res.body).toEqual({
        code: 404,
        message: `A coaster with name ${name} could not be found`,
      });
    });
  });

  describe('POST /v1/coasters', () => {
    test('should create a coaster and return 201', async () => {
      const newCoaster = {
        name: 'New coaster',
        park: 'New park',
        model: 'New model',
        type: ['First new type', 'Second new type'],
        country: 'Spain',
        length: 500,
        height: 100,
        speed: 80,
        inversions: 3,
        gForce: 4.2,
        year: 2001,
      };

      const res = await request(app).post('/v1/coasters').send(newCoaster).expect(httpStatus.CREATED);

      expect(res.body).toEqual({ ...newCoaster, id: expect.anything() });
      const dbCoaster = await Coaster.findById(res.body.id);
      expect(dbCoaster.toJSON()).toEqual({ ...newCoaster, id: res.body.id });
    });

    test('should fail create a coaster if name is taken and return 400', async () => {
      const repeated = await insertCoaster(allCoasters[0]);

      const newCoaster = {
        name: repeated.name,
        park: 'New park',
        model: 'New model',
        type: ['First new type', 'Second new type'],
        country: 'Spain',
        length: 500,
        height: 100,
        speed: 80,
        inversions: 3,
        gForce: 4.2,
        year: 2001,
      };

      const res = await request(app).post('/v1/coasters').send(newCoaster).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: 400, message: `A coaster with name ${repeated.name} already exists` });
    });

    test('should fail create a coaster if validation fails', async () => {
      const newCoaster = {
        name: 'New coaster',
        park: 'New park',
        model: 'New model',
        type: [],
        country: 'Spain',
        length: 500,
        height: 100,
        speed: 80,
        inversions: 3,
        gForce: 4.2,
        year: 2001,
      };

      const res = await request(app).post('/v1/coasters').send(newCoaster).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: 400, message: '"type" must contain at least 1 items' });
    });
  });

  describe('PATCH /v1/coasters/:id', () => {
    test('should update a coaster and return 200', async () => {
      const original = await insertCoaster(allCoasters[0]);
      const updateReq = { ...original, name: 'Another name' };
      delete updateReq.id;

      const res = await request(app).patch(`/v1/coasters/${original.id}`).send(updateReq).expect(httpStatus.OK);

      expect(res.body).toEqual({ ...updateReq, id: original.id });
      const dbCoaster = await Coaster.findById(original.id);
      expect(dbCoaster.toJSON()).toEqual({ ...updateReq, id: original.id });
    });

    test('should fail update a coaster if name is taken and return 400', async () => {
      const coasters = await insertCoasters(allCoasters);
      const updateReq = { ...coasters[0], name: coasters[1].name };
      delete updateReq.id;

      const res = await request(app).patch(`/v1/coasters/${coasters[0].id}`).send(updateReq).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: 400, message: `A coaster with name ${updateReq.name} already exists` });
    });

    test('should fail update a coaster if validation fails', async () => {
      const original = await insertCoaster(allCoasters[0]);
      const updateReq = { ...allCoasters[0], name: 'Another name', type: [] };

      const res = await request(app).patch(`/v1/coasters/${original.id}`).send(updateReq).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: 400, message: '"type" must contain at least 1 items' });
    });
  });

  describe('DELETE /v1/coasters/:id', () => {
    test('should delete one coaster by id and return 204', async () => {
      const coaster = await insertCoaster(allCoasters[0]);

      const res = await request(app).delete(`/v1/coasters/${coaster.id}`).send().expect(httpStatus.NO_CONTENT);

      expect(res.body).toEqual({});
      const dbCoaster = await Coaster.findById(coaster.id);
      expect(dbCoaster).toBeNull();
    });
  });
});
