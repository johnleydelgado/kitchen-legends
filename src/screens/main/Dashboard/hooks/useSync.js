import 'react-native-get-random-values';
import { useApp, useUser, Realm } from '@realm/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRealm } from '../../../../realm';
import { Answer } from '../../../../realm/models/Answer';
import { Player } from '../../../../realm/models/Player';
import { Question } from '../../../../realm/models/Question';
import { User } from '../../../../realm/models/User';
import { setProfile } from '../../../../redux/user';

const useSync = () => {
  const realmUser = useUser();
  const realm = useRealm();
  const app = useApp();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [syncType, setSyncType] = useState('');

  const initializeSync = async () => {
    const userId = parseInt(realmUser?.id);
    const data = { ...user, userId };
    const { email, firstName, lastName } = data;
    const realmSync = await Realm.open({
      schema: [User.schema, Player.schema, Answer.schema, Question.schema],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });

    await realmSync.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects(User.schema.name), {
        name: 'UserSub',
      });
    });

    realmSync.write(async () => {
      try {
        const users = realmSync.objects(User.name);
        const getUser = users.filtered(`email >= '${email}'`);
        if (getUser.length === 0) {
          realmSync.create('User', new User({ email, firstName, lastName, userId }));
          dispatch(setProfile({ email, firstName, lastName }));
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  useEffect(() => {
    switch (syncType) {
      case 'Rank':
        // initializeSync();
        break;
      default:
        '';
    }
  }, [syncType]);

  return { syncType, setSyncType };
};

export default useSync;
