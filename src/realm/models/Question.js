import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Question {
  constructor({ id = new Realm.BSON.ObjectId(), questions }) {
    this.questions = questions;
    this._id = id;
  }

  static schema = {
    name: 'Question',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      questions: 'string',
      answer: 'Answer?',
    },
  };
}
