'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // define association here
    }
  }

  Usuario.init({
    nombre: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    grupo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};