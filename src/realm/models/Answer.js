import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Answer {
  constructor({ id = new Realm.BSON.ObjectId(), answer, answerId }) {
    this.answer = answer;
    this._id = id;
    this.answerId = answerId;
  }

  static schema = {
    name: 'Answer',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      answer: 'string',
      answerId: 'int',
    },
  };
}
