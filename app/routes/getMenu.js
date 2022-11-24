const logger = require('../../utils/logger').getLogger();

const url = `/menutree/:rol_id`;

function build_menu (menuList, parentId) {
    let submenu = {};
    let filtered = menuList.filter(menu => menu.parent == parentId );
    filtered.forEach(menu => {
        let leaf = build_menu(menuList, menu.id);
        if (Object.keys(leaf).length === 0){
            submenu[menu.name] = menu.link;
        } else {
            submenu[menu.name] = leaf;
        }
    })
    return submenu;
}


module.exports = (app, models) => {
    app.get(url, async (req, res) => {
        logger.debug(`param: ${req.params.rol_id}`);
        let role = await models.Role.findOne({where:{id: req.params.rol_id}});
        if (!role) {
            res.status(404).send({});
            return;
        }
        let menus = await role.getMenus();
        if (!menus) {
            res.status(404).send({});
            return;
        }
        logger.debug(' menus: %O', menus.map( menu => menu.toJSON()));
        res.send(build_menu(menus));
    });
};