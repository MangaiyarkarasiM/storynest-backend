const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");

class Part extends Model{}

Part.init(
    {
      partName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      story_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        defaultValue: 'Sample'
      },
      vote : {
        type: DataTypes.MEDIUMINT,
        defaultValue: 0
      },
      view : {
        type: DataTypes.MEDIUMINT,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'draft'
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false'
      }
    },
    {
      sequelize,
      modelName: "part",
    }
  );
  
  module.exports = { Part };