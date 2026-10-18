'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grupo_permisos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  grupo_permisos.init({
    grupo: DataTypes.INTEGER,
    permiso: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'grupo_permisos',
  });
  return grupo_permisos;
};