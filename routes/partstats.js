var express = require('express');
var router = express.Router();
const partstats = require('../controller/partstats.controller');
const { authVerify } = require("../auth");

//To get a vote
router.get('/:id', authVerify, partstats.getPartStat);

//To create a new vote 
router.post('/create', authVerify, partstats.addPartStat);

module.exports = router;