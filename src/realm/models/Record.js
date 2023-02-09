import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Record {
  constructor({ id = new Realm.BSON.ObjectId(), score, player }) {
    this.score = score;
    this.player = player;
    this.createdAt = new Date();
    this._id = id;
  }

  static schema = {
    name: 'Record',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      score: 'int',
      player: 'Player?',
      createdAt: 'date',
      // project: { type: 'linkingObjects', objectType: 'User', property: 'players' },
    },
  };
}
