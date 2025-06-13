const express = require('express');
const router = express.Router();
const volleyballController = require('../controllers/volleyballController.js');
const { saveTeam, validateId } = require('../middleware/validator');

// GET all volleyball teams
router.get(
  '/',
  /* 
    #swagger.tags = ['Volleyball']
    #swagger.description = 'Retrieve all volleyball teams'
    #swagger.responses[200] = {
      description: 'A list of volleyball teams.'
    }
    #swagger.responses[400] = {
      description: 'Internal server error.'
    }
  */
  volleyballController.getAllTeams
);

// GET a single volleyball team by ID
router.get(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Volleyball']
    #swagger.description = 'Retrieve a volleyball team by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the volleyball team',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Volleyball team found.'
    }
    #swagger.responses[404] = {
      description: 'Team not found.'
    }
  */
  volleyballController.getTeamById
);

// POST a new volleyball team
router.post(
  '/',
  saveTeam,
  /* 
    #swagger.tags = ['Volleyball']
    #swagger.description = 'Create a new volleyball team'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'volleyball team data',
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
  volleyballController.createTeam
);


// PUT to update an existing volleyball team
router.put(
  '/:id',
  validateId,
  saveTeam,
  /* 
    #swagger.tags = ['Volleyball']
    #swagger.description = 'Update an existing volleyball team'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the volleyball team',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated volleyball team data',
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
  volleyballController.updateTeam
);

// DELETE a volleyball team
router.delete(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Volleyball']
    #swagger.description = 'Delete a volleyball team'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the volleyball team to delete',
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
  volleyballController.deleteTeam
);

module.exports = router;
