const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");
const { Part } = require("./part")

class Story extends Model{}

Story.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primary: true
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vote : {
        type: DataTypes.MEDIUMINT,
        defaultValue: '0'
      },
      view : {
        type: DataTypes.MEDIUMINT,
        defaultValue: '0'
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'ongoing'
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "story",
    }
  );

  Story.hasMany(Part, {as: 'parts', foreignKey:'story_id'});

  module.exports = { Story };