const Sequelize = require('sequelize');
import sequelize = require("sequelize");
import {Model} from 'sequelize';
class Media extends Model {}
Media.init({
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  // options
});