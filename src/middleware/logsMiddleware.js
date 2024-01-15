const logger = require("../modules/logger");

const logMiddlware = async (req,res , next) => {
      logger.info(`Received a ${req.method} request for ${req.url}`);
        next();


}
module.exports = {
    logMiddlware
}