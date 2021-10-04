const cheerio = require('cheerio');
const capitalize = require('capitalize');


//const solanartClient = require('./solanart');
const digitaleyesClient = require('./digitaleyes')
//const magicedenClient = require('./magiceden')
const { buildDigitalEyesMessage } = require('./discord');
//const { buildSolanartMessage, buildHowRareMessage } = require('./discord');

//add appropriate titles
const TITLE_FLOOR = 'Floor Sloth!';
const TITLE_LAST_LISTED = 'Last Listed!';
const TITLE_LAST_SOLD = 'Last Sold!';

//build messages for each market or make a function to decide which market
const floor = async () => buildDigitalEyesMessage(await digitaleyesClient.floor(), { title: TITLE_FLOOR });
const lastListed = async () => buildDigitalEyesMessage(await digitaleyesClient.lastListed(), { title: TITLE_LAST_LISTED });
const lastSold = async () => buildDigitalEyesMessage(await digitaleyesClient.lastSold(), { title: TITLE_LAST_SOLD });

module.exports = {
  floor,
  lastListed,
  lastSold,
};