import 'react-native-get-random-values';
import { createRealmContext } from '@realm/react';

import { Answer } from './models/Answer';
import { Player } from './models/Player';
import { Question } from './models/Question';
import { Room } from './models/Room';
import { User } from './models/User';

export const { useRealm, useQuery, RealmProvider } = createRealmContext({
  schema: [User.schema, Player.schema, Answer.schema, Question.schema, Room.schema],
  schemaVersion: 3,
});
