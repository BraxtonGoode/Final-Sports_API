const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { saveUser, validateId } = require('../middleware/validator');
const { isAuthenticated, checkAuthenticated } = require('../middleware/authenticated.js');

// GET all user teams
router.get(
  '/',
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Retrieve all users'
    #swagger.responses[200] = {
      description: 'A list of users.'
    }
    #swagger.responses[400] = {
      description: 'Internal server error.'
    }
  */
  userController.getAllUsers
);

// GET a single user by ID
router.get(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Retrieve a user by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the user',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'User found.'
    }
    #swagger.responses[404] = {
      description: 'User not found.'
    }
  */
  userController.getUserById
);

// POST a new user team
router.post(
  '/',
  isAuthenticated,
  checkAuthenticated,
  saveUser,
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Create a new user'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'user data',
      required: true,
      schema: {
        $firstName: 'John',
        $lastName: 'Doe',
        $position: 'Admin',
        $username: 'johndoe',

      }
    }
    #swagger.responses[201] = {
      description: 'User created successfully.'
    }
    #swagger.responses[400] = {
      description: 'Invalid user data.'
    }
  */
  userController.createUser
);

// PUT to update an existing user team
router.put(
  '/:id',
  isAuthenticated,
  checkAuthenticated,
  validateId,
  saveUser,
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Update an existing user'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the user',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user team data',
      required: true,
      schema: {
        $firstName: 'John',
        $lastName: 'Doe',
        $position: 'Admin',
        $username: 'johndoe',

      }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully.'
    }
    #swagger.responses[404] = {
      description: 'User not found.'
    }
  */
  userController.updateUser
);

// DELETE a user team
router.delete(
  '/:id',
  // isAuthenticated,
  checkAuthenticated,
  validateId,
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Delete a user'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the user to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'User deleted successfully.'
    }
    #swagger.responses[404] = {
      description: 'User not found.'
    }
  */
  userController.deleteUser
);

module.exports = router;
