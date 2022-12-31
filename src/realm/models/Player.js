import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Player {
  constructor({ id = new Realm.BSON.ObjectId(), name }) {
    this.name = name;
    this.createdAt = new Date();
    this._id = id;
  }

  static schema = {
    name: 'Player',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      createdAt: 'date',
      // project: { type: 'linkingObjects', objectType: 'User', property: 'players' },
    },
  };
}
