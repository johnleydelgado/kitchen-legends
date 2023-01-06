import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Room {
  constructor({ id = new Realm.BSON.ObjectId(), name, players }) {
    this._id = id;
    this.name = name;
    this.players = players;
    this.createdAt = new Date();
  }

  static schema = {
    name: 'Room',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      players: 'Player[]',
      createdAt: 'date',
      //   project: { type: 'linkingObjects', objectType: 'Project', property: 'tasks' },
    },
  };
}
