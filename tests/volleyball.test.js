// tests/volleyball.test.js
const request = require('supertest');
const express = require('express');
const volleyballRoutes = require('../routes/volleyball');
const mongoDb = require('../DB/connect');
const { ObjectId } = require('mongodb');

// Mock the DB connection
jest.mock('../DB/connect', () => ({
  getDb: jest.fn(),
}));

// Create Express app instance for testing
const app = express();
app.use(express.json());
app.use('/volleyball', volleyballRoutes);

describe('Volleyball GET Endpoints', () => {
  const mockTeams = [
    {
      _id: new ObjectId('64b1f2c2c3a71f1b7c2f0d13'),
      name: 'Test Team 1',
      record: '10-5',
      location: 'City, State',
      players: 12,
      colors: 'Red, White',
      headCoach: 'Coach One',
      streak: 3,
    },
    {
      _id: new ObjectId('64b1f2c2c3a71f1b7c2f0d14'),
      name: 'Test Team 2',
      record: '8-7',
      location: 'Another City, State',
      players: 15,
      colors: 'Blue, Black',
      headCoach: 'Coach Two',
      streak: 0,
    },
  ];

  beforeEach(() => {
    const mockCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockTeams),
      }),
      findOne: jest.fn().mockImplementation((query) => {
        return Promise.resolve(
          mockTeams.find((t) => t._id.toString() === query._id.toString())
        );
      }),
    };

    mongoDb.getDb.mockReturnValue({
      collection: () => mockCollection,
    });
  });

  test('GET /volleyball - should return all volleyball teams', async () => {
    const res = await request(app).get('/volleyball');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe('Test Team 1');
  });

  test('GET /volleyball/:id - valid ID returns a team', async () => {
    const res = await request(app).get('/volleyball/64b1f2c2c3a71f1b7c2f0d13');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Team 1');
  });

  test('GET /volleyball/:id - invalid ID returns 404', async () => {
    const nonExistentId = new ObjectId().toString();
    const res = await request(app).get(`/volleyball/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test('GET /volleyball - handles internal server error', async () => {
    mongoDb.getDb.mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/volleyball');
    expect(res.statusCode).toBe(400); // or 400 depending on your controller
    expect(res.body.message).toMatch(/error/i);
  });
});
