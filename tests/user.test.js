// tests/user.test.js
const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/user');
const mongoDb = require('../DB/connect');
const { ObjectId } = require('mongodb');

// Mock the DB connection
jest.mock('../DB/connect', () => ({
  getDb: jest.fn(),
}));

// Create Express app instance for testing
const app = express();
app.use(express.json());
app.use('/user', userRoutes);

describe('user GET Endpoints', () => {
  const mockTeams = [
    {
      _id: new ObjectId('64b1f2c2c3a71f1b7c2f0d13'),
      firstName: 'John',
      lastName: 'Doe',
      position: 'Admin',
      username: 'JohnDoe',
    },
    {
      _id: new ObjectId('64b1f2c2c3a71f1b7c2f0d14'),
      firstName: 'Braxton',
      lastName: 'Goode',
      position: 'member',
      username: 'BraxtonGoode',
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

  test('GET /user - should return all users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].firstName).toBe('John');
    expect(res.body[1].username).toBe('BraxtonGoode');
  });

  test('GET /user/:id - valid ID returns a user', async () => {
    const res = await request(app).get('/user/64b1f2c2c3a71f1b7c2f0d13');
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('John');
    expect(res.body.username).toBe('JohnDoe');
  });

  test('GET /user/:id - non-existent ID returns 404', async () => {
    const nonExistentId = new ObjectId().toString(); // valid format but not in mock data
    const res = await request(app).get(`/user/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test('GET /user - handles internal server error', async () => {
    mongoDb.getDb.mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(400); // matches your controller's error status
    expect(res.body.message).toMatch(/error/i);
  });
});
