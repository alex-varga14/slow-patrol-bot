const Discord = require('discord.js');

/* SOLANART NOT IMPLEMENTED

function buildSolanartMessage(item, { title }) {
  return {
    embeds: [
      new Discord.MessageEmbed()
        .setTitle(title)
        .setURL('SLOW PATROL COLLECTION')
        .setAuthor('Slow Patrol Bot', 'https://pbs.twimg.com/profile_images/1435520717357936642/W0s79NiR_400x400.jpg', 'https://legionpunks.com')
        .addFields(
          { name: 'Name', value: item.name },
          { name: 'Amount', value: `${item.price} ${item.currency}` },
        )
        .setImage(item.link_img)
        .setTimestamp(Date.parse(item.date))
        .setFooter('Listed on Solanart', 'https://solanart.io/static/media/logo.9a0a46b5.png'),
    ],
  };
}
*/
function buildDigitalEyesMessage(item, { title }) {
  return {
    embeds: [
      new Discord.MessageEmbed()
        .setTitle(title)
        .setURL('https://digitaleyes.market/collections/The%20Slow%20Patrol')
        .setAuthor('Slow Patrol Bot', 'https://pbs.twimg.com/profile_images/1435520717357936642/W0s79NiR_400x400.jpg', 'https://www.theslowpatrol.com/')
        .addFields(
          { name: 'Name', value: item.name },
          { name: 'Amount', value: `${item.price} ${item.currency}` },
        )
        .setImage(item.link_img)
        .setTimestamp(Date.parse(item.date))
       // .setFooter('Listed on Digital Eyes', 'DE LOGO'),
    ],
  };
}
/* ME once DE work
function buildMagicEdenMessage(item, { title }) {
  return {
    embeds: [
      new Discord.MessageEmbed()
        .setTitle(title)
        .setURL('https://www.magiceden.io/marketplace?collection_symbol=the_slow_patrol')
        .setAuthor('Slow Patrol Bot', 'https://pbs.twimg.com/profile_images/1435520717357936642/W0s79NiR_400x400.jpg', 'https://www.theslowpatrol.com/')
        .addFields(
          { name: 'Name', value: item.name },
          { name: 'Amount', value: `${item.price} ${item.currency}` },
        )
        .setImage(item.link_img)
        .setTimestamp(Date.parse(item.date))
       // .setFooter('Listed on Magic Eden', 'Magic eden LOGO'),
    ],
  };
} */

async function buildClient({ token, guild }, logger) {
  const client = new Discord.Client({ intents: ['GUILD_MESSAGES'] });
  const interactions = {};

  await client.login(token);
  client.ws.on('INTERACTION_CREATE', async interaction => {
    try {
      await handleInteraction(client, interaction);
    } catch (e) {
      logger.error(e);
    }
  });

  const getChannel = async channelId => client.channels.fetch(channelId);

  const registerInteraction = ({ name, description, options = [] }, interactionFunc) => {
    let func = client.api.applications(client.user.id);

    if (guild) {
      func = func.guilds(guild);
    }

    func.commands.post({
      data: {
        name,
        description,
        options,
      },
    });
    interactions[name] = interactionFunc;
  };

  const handleInteraction = async (client, interaction) => {
    const options = interaction.data.options.reduce((acc, d) => ({ ...acc, [d.name]: d.value, }), {});

    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: await interactions[interaction.data.name](options),
      },
    });
  };

  return {
    getChannel,
    registerInteraction,
  };
}

module.exports = {
  buildClient,
  buildDigitalEyesMessage,
  //buildMagicEdenMessage,
};

//add appropriate exports