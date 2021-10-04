
async function buildSender() {
    const senders = {};
  
    return {
      addSender: (name, sender) => { senders[name] = sender; },
      listing: item => Promise.all(Object.values(senders).map(sender => sender.listing(item))),
      sale: item => Promise.all(Object.values(senders).map(sender => sender.sale(item))),
    };
  }
  
  module.exports = {
    buildSender,
  };