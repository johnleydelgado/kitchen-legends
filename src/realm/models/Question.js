import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Question {
  constructor({ id = new Realm.BSON.ObjectId(), questions, answerId }) {
    this.questions = questions;
    this._id = id;
    this.answerId = answerId;
  }

  static schema = {
    name: 'Question',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      questions: 'string',
      answerId: 'int',
      points: 'int',
      category: 'string',
    },
  };
}
