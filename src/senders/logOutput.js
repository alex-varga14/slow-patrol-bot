
async function buildSender(logger) {
    return {
      listing: item => logger.info(`Listing: ${item.id} - ${item.name}`),
      sale: item => logger.info(`Sale: ${item.id} - ${item.name}`),
    };
  }
  
  module.exports = {
    buildSender,
  };