
/*
FOR WHEN SLOW PATROL IS LISTED ON SOLANART

const _ = require('lodash');
const axios = require('axios');


//get ME AND DE SALES URLS AND LISTINGS
//FIGURE SHIT OUT
const COLLECTION_NAME = 'theslowpatrol';
const SALES_URL = `https://tlsktfahct.medianetwork.cloud/all_sold_per_collection_day?collection=${COLLECTION_NAME}`;
const LISTINGS_URL = `https://tlsktfahct.medianetwork.cloud/nft_for_sale?collection=${COLLECTION_NAME}`;

//queies for listings and sales
const queryListings = async () => (await axios.get(LISTINGS_URL)).data;
const querySales = async () => (await axios.get(SALES_URL)).data;

const lastListed = async () => (await queryListings()).reverse()[0];
const lastSold = async () => (await querySales())[0];
const floor = async () => (await queryListings()).sort((a, b) => a.price - b.price)[0];

let previousListings = null;
const getNewListings = async logger => {
  try {
    const newListings = [];

    const results = await queryListings();
    const current = results.map(i => i.id);

    if (previousListings) {
      const filtered = current.filter(i => !previousListings.includes(i));
      for (let i = 0; i < filtered.length; i++) {
        const item = results.find(x => x.id === filtered[i]);
        newListings.push(item);
      }
    }

    previousListings = _.uniq(current.concat(previousListings));
    return newListings;
  } catch (e) {
    logger.error(`getNewListings failed: ${e.message}`);
    return [];
  }
};

let previousSales = null;
const getNewSales = async logger => {
  try {
    const newSales = [];

    const results = (await querySales()).reverse();
    const current = results.map(i => i.id);

    if (previousSales) {
      const filtered = current.filter(i => !previousSales.includes(i));
      for(let i = 0; i < filtered.length; i++) {
        const item = results.find(x => x.id === filtered[i]);
        newSales.push(item);
      }
    }

    previousSales = _.uniq(current.concat(previousSales));
    return newSales;
  } catch (e) {
    logger.error(`getNewSales failed: ${e.message}`);
    return [];
  }
};

module.exports = {
  getNewListings,
  getNewSales,
  floor,
  lastListed,
  lastSold,
}; */