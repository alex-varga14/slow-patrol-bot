//Twitter messages

const { buildMessage } = require('../twitter');

async function buildSender(twitter) {
    return {
      listing: () => {},
      sale: item => twitter.send(buildMessage(item), item.link_img),
    };
  }

  module.exports = {
    buildSender,
  };