var express = require('express');
var router = express.Router();
const storystats = require('../controller/storystats.controller');
const { authVerify } = require("../auth");

//To get a vote
router.get('/:id', authVerify, storystats.getStoryStat);

//To create a new vote 
router.post('/create', authVerify, storystats.addStoryStat);

module.exports = router;