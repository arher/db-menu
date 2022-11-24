const { Model } = require('sequelize');
const role = require('./role');
  
module.exports = (sequelize, DataTypes) => {
  class RoleMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
        models.Role.belongsToMany(
            models.Menu, 
            {
                as: 'Menus', 
                through: RoleMenu, 
                foreignKey: {
                    name: 'role',
                    field: 'role_id'
                },
                otherKey: {
                    name: 'menu',
                    field: 'menu_id'
                }
            }
        );
        models.Menu.belongsToMany(
            models.Role, 
            {
                as: 'Roles', 
                through: RoleMenu, 
                foreignKey: {
                    name: 'menu',
                    field: 'menu_id'
                },
                otherKey: {
                    name: 'role',
                    field: 'role_id'
                }
            }
        );
    }

    static createResource(finale, server, models) {
        let singular = this.options.name.singular.toLowerCase();
        let plural = this.options.name.plural.toLowerCase();
        const resource = finale.resource({
            model: RoleMenu,
            endpoints: [`/${plural}`, `/${singular}/:role_id/:menu_id`]
        });
    }

  }
  RoleMenu.init({
    //aditional data?
  }, {
    sequelize,
    modelName: 'RoleMenu',
  });
  return RoleMenu;
};
  