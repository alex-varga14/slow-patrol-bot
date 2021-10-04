
//const { buildSolanartMessage } = require('../discord');
//const { buildMagicEdenMessage } = require('../discord');
const { buildDigitalEyesMessage } = require('../discord');

async function buildSender(discord, channelIds) {
  const channelListings = await discord.getChannel(channelIds.listings);
  const channelSales = await discord.getChannel(channelIds.sales);

  return {
    listing: item => channelListings.send(buildDigitalEyesMessage(item, { title: 'New Listing' })),
    sale: item => channelSales.send(buildDigitalEyesMessage(item, { title: 'New Sale' })),
  };
}

module.exports = {
  buildSender,
};