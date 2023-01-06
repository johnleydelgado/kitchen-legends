import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Question {
  constructor({ id = new Realm.BSON.ObjectId(), questions, answerId, qrCode }) {
    this.questions = questions;
    this._id = id;
    this.qrCode = qrCode;
    this.answerId = answerId;
  }

  static schema = {
    name: 'Question',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      questions: 'string',
      qrCode: 'string',
      answerId: 'int',
    },
  };
}
