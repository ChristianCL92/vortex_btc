import PubNub from 'pubnub';

const CHANNELS = {
    BLOCKCHAIN: 'BLOCKCHAIN',
};

export default class PubNubServer {
  constructor({ blockchain, credentials }) {
    this.blockchain = blockchain;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);
        // console.log(msg);

        console.log(
          `Meddelande mottagits på kanal: ${channel}, meddelande: ${message}`
        );

        if (channel === CHANNELS.BLOCKCHAIN) {
          this.blockchain.substituteChain(msg);
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}