const { Model } = require('sequelize');
  
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }

    static createResource(finale, server, models) {
      let singular = this.options.name.singular.toLowerCase();
      let plural = this.options.name.plural.toLowerCase();
      const resource = finale.resource({
        model: Role,
        endpoints: [`/${plural}`, `/${singular}/:id`]
      });
    }

  }
  Role.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
  