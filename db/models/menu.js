const { Model } = require('sequelize');
  
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Menu.belongsTo(Menu, {as:"Parent", foreignKey: {name:'parent', field: 'parent_id'}});
      Menu.hasMany(Menu, {as:"Children",foreignKey: {name:'parent', field:'parent_id'}});
    }

    static createResource(finale, server, models) {
        let singular = this.options.name.singular.toLowerCase();
        let plural = this.options.name.plural.toLowerCase();
        const resource = finale.resource({
            model: Menu,
            endpoints: [`/${plural}`, `/${singular}/:id`]
        });
    }

  }
  Menu.init({
    name: DataTypes.STRING,
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};