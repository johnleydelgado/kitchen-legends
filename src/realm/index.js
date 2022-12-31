import { createRealmContext, Realm } from '@realm/react';
import 'react-native-get-random-values';

import { Answer } from './models/Answer';
import { Player } from './models/Player';
import { Question } from './models/Question';
import { User } from './models/User';

export const { useRealm, useQuery, RealmProvider } = createRealmContext({
  schema: [User.schema, Player.schema, Answer.schema, Question.schema],
});

export const realmSync = async (app) => {
  const realmFileBehavior = {
    type: 'downloadBeforeOpen',
    timeOut: 1000,
    timeOutBehavior: 'openLocalRealm',
  };

  return await Realm.open({
    schema: [User.schema, Player.schema, Answer.schema, Question.schema],
    sync: {
      user: app.currentUser,
      flexible: true,
      existingRealmFileBehavior: realmFileBehavior,
      newRealmFileBehavior: realmFileBehavior,
      // onError: (error) => console.error('realm sync error: ', error),
    },
  });
};
