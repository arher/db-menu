const logger = require('./utils/logger').getLogger();
const {app} = require('./app');
const {port} = require('./app/config');


app.listen(port, () => {
    logger.info('');
    logger.info('                 __  ');
    logger.info('                / _) ');
    logger.info('       _/\\/\\/\\_/ /   ');
    logger.info('     _|         /    ');
    logger.info('   _|  (  | (  |     ');
    logger.info('  /__.-\'|_|--|_|  AHC');
    logger.info('');
    logger.info(`app listening on port ${app.address().port}`);
    console.log("app is up!");
})