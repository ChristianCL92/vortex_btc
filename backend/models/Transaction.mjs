import { v4 as uuid4 } from 'uuid';

class Transaction {
  constructor(sender, recipient, amount) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.transactionId = uuid4().replaceAll('-', '');
  }
}

export default Transaction;
