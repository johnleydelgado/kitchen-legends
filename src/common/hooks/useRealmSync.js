import { useApp, Realm } from '@realm/react';

import { Answer } from '../../realm/models/Answer';
import { Player } from '../../realm/models/Player';
import { Question } from '../../realm/models/Question';
import { User } from '../../realm/models/User';

export const useRealmSync = async () => {
  const app = useApp();
  const realmFileBehavior = {
    type: 'downloadBeforeOpen',
    timeOut: 1000,
    timeOutBehavior: 'openLocalRealm', // open the local realm if the download has not completed within 1000ms
  };

  try {
    return await Realm.open({
      schema: [User.schema, Player.schema, Answer.schema, Question.schema],
      sync: {
        user: app.currentUser,
        flexible: true,
        existingRealmFileBehavior: realmFileBehavior,
        newRealmFileBehavior: realmFileBehavior,
      },
    });
  } catch (e) {
    console.log('online open sync realm', e);
  }
};
