const mongoDb = require('../DB/connect.js');
const objectId = require('mongodb').ObjectId;

const getAllTeams = async (req, res) => {
  try {
    const db = await mongoDb.getDb().collection('Volleyball').find();
    const VolleyballTeams = await db.toArray();
    res.header('Content-Type', 'application/json');
    res.status(200).json(VolleyballTeams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

const getTeamById = async (req, res) => {
  try {
    const teamId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('Volleyball')
      .findOne({ _id: teamId });
    if (!db) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json(db);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = {
      name: req.body.name,
      record: req.body.record,
      location: req.body.location,
      players: req.body.players,
      colors: req.body.colors,
      headCoach: req.body.headCoach,
      streak: req.body.streak,
    };

    const response = await mongoDb
      .getDb()
      .collection('Volleyball')
      .insertOne(team);
    res.header('Content-Type', 'application/json');
    res.status(201).json({ response, message: 'Team created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

const updateTeam = async (req, res) => {
  try {
    const teamId = new objectId(req.params.id);
    const team = {
      name: req.body.name,
      record: req.body.record,
      location: req.body.location,
      players: req.body.players,
      colors: req.body.colors,
      headCoach: req.body.headCoach,
      streak: req.body.streak,
    };

    const response = await mongoDb
      .getDb()
      .collection('Volleyball')
      .replaceOne({ _id: teamId }, team);
    res.header('Content-Type', 'application/json');
    res.status(200).json({ response, message: 'Team updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('Volleyball')
      .deleteOne({ _id: teamId });
    if (db.deletedCount === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
