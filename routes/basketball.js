const express = require('express');
const router = express.Router();
const BasketballController = require('../controllers/basketballController.js');
const { saveTeam, validateId } = require('../middleware/validator');
const { isAuthenticated, checkAuthenticated } = require('../middleware/authenticated.js');

// GET all Basketball teams
router.get(
  '/',
  /* 
    #swagger.tags = ['Basketball']
    #swagger.description = 'Retrieve all Basketball teams'
    #swagger.responses[200] = {
      description: 'A list of Basketball teams.'
    }
    #swagger.responses[400] = {
      description: 'Internal server error.'
    }
  */
  BasketballController.getAllTeams
);

// GET a single Basketball team by ID
router.get(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Basketball']
    #swagger.description = 'Retrieve a Basketball team by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the Basketball team',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Basketball team found.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  BasketballController.getTeamById
);

// POST a new Basketball team
router.post(
  '/',
  isAuthenticated,
  checkAuthenticated,
  saveTeam,
  /* 
    #swagger.tags = ['Basketball']
    #swagger.description = 'Create a new Basketball team'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Basketball team data',
      required: true,
      schema: {
        $name: 'Team Name',
        $record: '30-2-3',
        $location: 'New City, State',
        $players: 23,
        $colors: 'Blue, Black',
        $headCoach: 'New Coach Name',
        $streak: 2
      }
    }
    #swagger.responses[201] = {
      description: 'Team created successfully.'
    }
    #swagger.responses[400] = {
      description: 'Invalid team data.'
    }
  */
  BasketballController.createTeam
);

// PUT to update an existing Basketball team
router.put(
  '/:id',
  validateId,
  isAuthenticated,
  checkAuthenticated,
  saveTeam,
  /* 
    #swagger.tags = ['Basketball']
    #swagger.description = 'Update an existing Basketball team'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the Basketball team',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated Basketball team data',
      required: true,
      schema: {
        $name: 'Updated Team Name',
        $record: '30-2-3',
        $location: 'New City, State',
        $players: 23,
        $colors: 'Blue, Black',
        $headCoach: 'New Coach Name',
        $streak: 2
      }
    }
    #swagger.responses[200] = {
      description: 'Team updated successfully.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  BasketballController.updateTeam
);

// DELETE a Basketball team
router.delete(
  '/:id',
  validateId,
  isAuthenticated,
  checkAuthenticated,
  /* 
    #swagger.tags = ['Basketball']
    #swagger.description = 'Delete a Basketball team'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the Basketball team to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Team deleted successfully.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  BasketballController.deleteTeam
);

module.exports = router;
