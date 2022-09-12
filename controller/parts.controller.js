const { Part } = require("../model/part");

exports.findAll = async (req, res) => {

  try {
    let details = await Part.findAll();
    res.send({
      statusCode: 200,
      parts: details
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
    let details = await Part.findByPk(req.params.id);
    if (details) {
      res.send({
        statusCode: 200,
        part: details
      });
    } else {
      res.send({
        statusCode: 401,
        message: "No Part found with the given Part Id",
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

// exports.findAllWithUserId = async (req, res) => {
//   try {
//     let details = await Part.findAll({
//       where: { author: req.params.user },
//       include: [{ model: Part, as: "parts" }],
//     });
//     res.send({
//       statusCode: 200,
//       parts: details,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       statusCode: 500,
//       message: "Internal Server Error",
//       error: error
//     });
//   }
// };

exports.create = async (req, res) => {
  try {
    let details = await Part.create(req.body);
    res.send({
      statusCode: 200,
      message: "Part Created",
      part: details
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
    let details = await Part.update(req.body, {
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
        message: `Cannot update Part with id=${req.params.id}. Maybe Part was not found or req.body is empty!`,
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

exports.deletePartWithId = async (req, res) => {
  try {
    let details = await Part.destroy({ where: { id: req.params.id } });
    if (details === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "Part Deleted",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot delete Part with id=${req.params.id}. Part may not be found!`,
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
