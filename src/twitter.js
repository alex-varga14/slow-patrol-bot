//Required Libraries
const Twitter = require('twitter');
const axios = require('axios');

function buildMessage(item) {
  return `${item.name} just sold on Digital Eyes for ${item.price} ${item.currency} #SLOW PATROL`;
}
//once multiple markets are in
//sold on the ${item.market} for ${item.price} ${item.currency}

function buildClient(opts, logger) {
  const client = new Twitter({
    consumer_key: opts.apiKey,
    consumer_secret: opts.apiSecret,
    access_token_key: opts.accessToken,
    access_token_secret: opts.accessSecret,
  });

  const send = async (message, image) => {
    const imageData = await axios.get(image, { responseType: 'arraybuffer'});
    const imageDataBase64 = Buffer.from(imageData.data, 'binary').toString('base64');
    const mediaUploadResponse = await client.post('media/upload', { media_data: imageDataBase64 });

    return client.post('statuses/update', {
      status: message,
      media_ids: mediaUploadResponse.media_id_string
    });
  }
  return {
    send,
  }
}

module.exports = {
  buildClient,
  buildMessage,
}