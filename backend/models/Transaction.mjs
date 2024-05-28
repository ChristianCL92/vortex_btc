import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
  constructor(amount, sender, recipient) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.transactionId = uuidv4().replaceAll('-', '');
  }
}
