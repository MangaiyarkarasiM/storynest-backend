const { Part } = require("../model/part");
var { Story } = require("../model/story");

exports.findAll = async (req, res) => {
  try {
    let details = await Story.findAll({
      include: [{ model: Part, as: "parts" }],
    });
    res.send({
      statusCode: 200,
      stories: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    let details = await Story.findByPk(req.params.id, {
      include: [{ model: Part, as: "parts" }],
    });
    if (details) {
      res.send({
        statusCode: 200,
        story: details,
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No Story found with the given Story Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.findAllWithUserId = async (req, res) => {
  try {
    let details = await Story.findAll({
      where: { author: req.params.user },
      include: [{ model: Part, as: "parts" }],
    });
    res.send({
      statusCode: 200,
      stories: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error
    });
  }
};

exports.create = async (req, res) => {
  try {
    const story = await Story.findOne({ where: { title: req.body.title } });
    if (story) {
      res.send({
        statusCode: 400,
        message: "Story title already exists",
      });
      return;
    }
    let details = await Story.create(req.body);
    res.send({
      statusCode: 200,
      message: "Story Created",
      story: details
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error
    });
  }
};

exports.updateWithId = async (req, res) => {
  try {
    let details = await Story.update(req.body, {
      where: { id: req.params.id },
    });
    if (details[0] === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "Changes Saved",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot update Story with id=${req.params.id}. Maybe Story was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteStoryWithId = async (req, res) => {
  try {
    let details = await Story.destroy({ where: { id: req.params.id } });
    if (details === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "Story Deleted",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot delete Story with id=${req.params.id}. Story may not be found!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
