import 'react-native-get-random-values';
import { Realm } from '@realm/react';

export class User {
  constructor({ id = new Realm.BSON.ObjectId(), email, firstName, lastName, userId, players }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;
    this.createdAt = new Date();
    this._id = id;
    this.players = players;
  }

  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      email: 'string',
      firstName: 'string',
      lastName: 'string',
      userId: 'int',
      players: 'Player[]',
      createdAt: 'date',
      //   project: { type: 'linkingObjects', objectType: 'Project', property: 'tasks' },
    },
  };
}
