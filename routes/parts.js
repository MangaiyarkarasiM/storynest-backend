var express = require('express');
var router = express.Router();
var parts = require('../controller/parts.controller');
const { authVerify } = require("../auth");

//To get all parts
router.get('/', parts.findAll);

//To get the part with part Id
router.get('/:id', authVerify, parts.findById);

//To create a new part 
router.post('/create', authVerify, parts.create);

//To edit the part with id
router.put('/:id', authVerify, parts.updateWithId);

//To delete the part with id
router.delete('/:id', authVerify, parts.deletePartWithId);

module.exports = router;