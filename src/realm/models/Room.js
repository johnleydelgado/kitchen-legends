import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class Room {
  constructor({ id = new Realm.BSON.ObjectId(), name, players, records = [] }) {
    this._id = id;
    this.name = name;
    this.players = players;
    this.records = records;
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
      records: 'Record[]',
      //   project: { type: 'linkingObjects', objectType: 'Project', property: 'tasks' },
    },
  };
}
