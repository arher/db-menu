const models = require('../db/models');
const logger = require('../utils/logger').getLogger();

(async () => {
    logger.warn("Database Initialization Start!!!");
    try {
        await models.sequelize.sync({
            alter: true, // could be force: true to drop the tables
        });
        logger.warn("Database Initialization Finished!!!");    
    } catch (error) {
        logger.error("DB Init Error! ");
        logger.error(error);
    }
})();
