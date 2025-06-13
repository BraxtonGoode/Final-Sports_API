const mongoDb = require('../DB/connect.js');
const objectId = require('mongodb').ObjectId;


const getAllUsers = async (req, res) => {
  try {
    const db = await mongoDb.getDb().collection('User').find();
    const users = await db.toArray();
    res.header('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('User')
      .findOne({ _id: userId });
    if (!db) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json(db);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      username: req.body.username,
    };


    const response = await mongoDb.getDb().collection('User').insertOne(user);
    res.header('Content-Type', 'application/json');
    res.status(200).json({ response, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating User', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      username: req.body.username,
    };

    const response = await mongoDb
      .getDb()
      .collection('User')
      .replaceOne({ _id: userId }, user);
    res.header('Content-Type', 'application/json');
    res.status(200).json({ response, message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('User')
      .deleteOne({ _id: userId });
    if (db.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
