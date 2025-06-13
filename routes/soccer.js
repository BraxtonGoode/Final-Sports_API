const express = require('express');
const router = express.Router();
const soccerController = require('../controllers/soccerController.js');
const { saveTeam, validateId } = require('../middleware/validator');

/// GET all soccer teams
router.get(
  '/',
  /* 
    #swagger.tags = ['Soccer']
    #swagger.description = 'Retrieve all soccer teams'
    #swagger.responses[200] = {
      description: 'A list of soccer teams.'
    }
    #swagger.responses[400] = {
      description: 'Internal server error.'
    }
  */
  soccerController.getAllTeams
);

// GET a single soccer team by ID
router.get(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Soccer']
    #swagger.description = 'Retrieve a single soccer team by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the soccer team',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Soccer team found.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  soccerController.getTeamById
);

// POST a new soccer team
router.post(
  '/',
  saveTeam,
  /* 
    #swagger.tags = ['Soccer']
    #swagger.description = 'Create a new soccer team'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Soccer team data',
      required: true,
      schema: {
        $name: 'Team Name',
        $record: '12-2-2',
        $location: 'Updated City, State',
        $players: 23,
        $colors: 'Red, Black',
        $headCoach: 'Updated Coach Y',
        $streak: 3
      }
    }
    #swagger.responses[201] = {
      description: 'Team created successfully.'
    }
    #swagger.responses[400] = {
      description: 'Invalid team data.'
    }
  */
  soccerController.createTeam
);

// PUT to update an existing soccer team
router.put(
  '/:id',
  validateId,
  saveTeam,
  /* 
    #swagger.tags = ['Soccer']
    #swagger.description = 'Update an existing soccer team'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the soccer team',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated soccer team data',
      required: true,
      schema: {
        $name: 'Updated Team Name',
        $record: '12-2-2',
        $location: 'Updated City, State',
        $players: 23,
        $colors: 'Red, Black',
        $headCoach: 'Updated Coach Y',
        $streak: 3
      }
    }
    #swagger.responses[200] = {
      description: 'Team updated successfully.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  soccerController.updateTeam
);

// DELETE a soccer team
router.delete(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Soccer']
    #swagger.description = 'Delete a soccer team by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the soccer team',
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
  soccerController.deleteTeam
);

module.exports = router;
