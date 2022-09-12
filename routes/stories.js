var express = require('express');
var router = express.Router();
var stories = require("../controller/stories.controller");
const { authVerify } = require("../auth");

//To get all stories
router.get('/', stories.findAll);

//To get the story with story Id
router.get('/:id', authVerify, stories.findById);

//To get the story with createdBy
router.get('/author/:user', authVerify, stories.findAllWithUserId);

//To create a new story 
router.post('/create', authVerify, stories.create);

//To edit the story with id
router.put('/:id', authVerify, stories.updateWithId);

//To delete the story with id
router.delete('/:id', authVerify, stories.deleteStoryWithId);

module.exports = router;