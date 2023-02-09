import { useApp } from '@realm/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import Realm from 'realm';

import { useRealm } from '../realm';
import { Answer } from '../realm/models/Answer';
import { Player } from '../realm/models/Player';
import { Question } from '../realm/models/Question';
import { Record } from '../realm/models/Record';
import { Room } from '../realm/models/Room';
import { User } from '../realm/models/User';
import { setProfile } from '../redux/user';

import { isEmpty } from 'lodash';

// ?instance of Realm app

const AuthContext = React.createContext(null);

const SyncProvider = (props) => {
  const app = useApp();
  const localRealm = useRealm();
  // const { isConnected, isInternetReachable } = useNetInfo();

  const dispatch = useDispatch();

  const [user, setUser] = React.useState();
  const { profileInfo } = useSelector((state) => state.user);
  const [loadingSync, setLoadingSync] = React.useState(false);

  const state = { user, loadingSync };

  React.useEffect(() => {
    if (app.id) {
      console.log('No user found, Please Login');
      const player = localRealm.objects(Player.name);
      try {
        // player.addListener(onPlayerChange);
      } catch (error) {
        console.log('error');
        console.error(`An exception was thrown within the change listener: ${error}`);
      }
    } else {
      console.log('user', user);
    }
  }, [localRealm]);

  const signOut = async () => {
    // signOut logic
  };

  const signInAnonymous = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      setUser(user);
    } catch (err) {
      console.error('Failed to log in', err);
    }
  };

  const syncNewUser = async (data) => {
    const { email, firstName, lastName, userId } = data;
    const newData = '';

    const subscriptions = localRealm.subscriptions;
    console.log('syncRealm', subscriptions);
    if (isEmpty(subscriptions)) {
      try {
        await localRealm.subscriptions.update((mutableSubs) => {
          mutableSubs.add(localRealm.objects(User.schema.name), {
            name: 'UserSub',
          });
          mutableSubs.add(localRealm.objects(Player.schema.name), {
            name: 'PlayerSub',
          });
          mutableSubs.add(localRealm.objects(Room.schema.name), {
            name: 'RoomSub',
          });
          mutableSubs.add(localRealm.objects(Question.schema.name), {
            name: 'QuestionSub',
          });
          mutableSubs.add(localRealm.objects(Answer.schema.name), {
            name: 'AnswerSub',
          });
          mutableSubs.add(localRealm.objects(Record.schema.name), {
            name: 'RecordSub',
          });
        });
      } catch (e) {
        console.error('ERROR: ', e);
      }
    }

    localRealm.write(async () => {
      const users = localRealm.objects(User.name);
      const getUser = users.filtered(`email >= '${email}'`);
      console.log('getUser', getUser);
      if (getUser.length === 0) {
        localRealm.create('User', new User({ email, firstName, lastName, userId, players: [] }));
        // newData = { email, firstName, lastName, userId, players: [] };
        dispatch(setProfile({ email, firstName, lastName }));
      } else {
        // const createdPlayer = realm.create(Player.schema.name, new Player({ name: 'test' }));
        // const players = realm.objects(Player.name);
        // console.log('players', players);
        const { email, firstName, lastName, players } = getUser[0];
        // newData = { email, firstName, lastName, userId, players };
        dispatch(setProfile({ email, firstName, lastName }));
      }
    });

    setLoadingSync(false);

    // isConnected()
    //   .then(async () => {
    //     console.log('sync here !');

    //     const syncRealm = await realmSync(app);

    //     const subscriptions = syncRealm.subscriptions;

    //     if (isEmpty(subscriptions)) {
    //       await syncRealm.subscriptions.update((mutableSubs) => {
    //         mutableSubs.add(syncRealm.objects(User.schema.name), {
    //           name: 'UserSub',
    //         });
    //       });

    //       await syncRealm.subscriptions.update((mutableSubs) => {
    //         mutableSubs.add(syncRealm.objects(Player.schema.name), {
    //           name: 'PlayerSub',
    //         });
    //       });
    //     }

    //     syncRealm.write(async () => {
    //       const users = syncRealm.objects(User.name);
    //       const getUser = users.filtered(`email >= '${email}'`);
    //       console.log('getUser', getUser);
    //       if (getUser.length === 0) {
    //         syncRealm.create('User', new User({ email, firstName, lastName, userId, players: [] }));
    //         newData = { email, firstName, lastName, userId, players: [] };
    //         dispatch(setProfile({ email, firstName, lastName }));
    //       } else {
    //         const { email, firstName, lastName, players } = getUser[0];
    //         newData = { email, firstName, lastName, userId, players };
    //         dispatch(setProfile({ email, firstName, lastName }));
    //       }
    //     });

    //     // await syncRealm.close();
    //     setLoadingSync(false);

    //     // if (syncRealm.isClosed) {
    //     localRealm.write(() => {
    //       const users = localRealm.objects(User.name);
    //       const getUser = users.filtered(`email >= '${email}'`);
    //       // const playerArr = users.objects(Player.name).filtered('_id == $0', localItem._id);
    //       if (getUser.length === 0) {
    //         localRealm.create(User.schema.name, new User(newData));
    //       }
    //       setLoadingSync(false);
    //     });
    //     // }
    //   })
    //   .catch(() => setLoadingSync(false));
  };

  const onPlayerChange = async (player, changes) => {
    if (changes.insertions.length !== 0) {
      // isConnected().then(async () => {
      //   const syncRealm = await realmSync(app);
      //   for (const localItem of player) {
      //     const playerArr = syncRealm.objects(Player.name).filtered('_id == $0', localItem._id);
      //     if (playerArr.length === 0) {
      //       const user = syncRealm.objects(User.name);
      //       const getAllPlayers = user.filtered(`email >= '${profileInfo.email}'`)[0];
      //       syncRealm.write(async () => {
      //         const createdPlayer = syncRealm.create(
      //           Player.name,
      //           new Player({ id: localItem._id, name: localItem.name })
      //         );
      //         getAllPlayers.players.push(createdPlayer);
      //       });
      //     }
      //   }
      // });
    }

    // if (changes.deletions) {
    //   console.log(`player is deleted: ${changes.deleted}`);
    // } else {
    //   changes.changedProperties.forEach((prop) => {
    //     console.log(`* the value of "${prop}" changed to ${player[prop]}`);
    //   });
    // }
  };

  return (
    <AuthContext.Provider value={{ syncNewUser, signOut, setLoadingSync, signInAnonymous, state }}>
      {props.children}
    </AuthContext.Provider>
  );
};
const useSync = () => {
  const auth = React.useContext(AuthContext);
  if (auth == null) {
    throw new Error('useSync() was called outside of AuthProvider');
  }
  return auth;
};

export { SyncProvider, useSync };
