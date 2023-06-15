//import liraries
import 'react-native-get-random-values';
import { useUser } from '@realm/react';
import { Box } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../../common/components/Loading/Loading';
import colors from '../../../common/constant/colors';
import { useSync } from '../../../context/SyncContext';
import Classic from './components/Classic';
import Default from './components/Default';
import Rank from './components/Rank';
import useCategory from './hooks/useCategory';

const Dashboard = () => {
  // redux
  const { user } = useSelector((state) => state.user);

  // realm
  const realmUser = useUser();
  // const localRealm = useRealm();
  // const usersRealm = localRealm.objects(User.name);
  // const { players } = usersRealm.filtered(`email >= '${profileInfo.email}'`)[0];
  // console.log('players', players);
  // context
  const { syncNewUser, state, setLoadingSync } = useSync();

  //hooks
  const { category, setCategory, animatedStyleDefault, animatedStyleRank } = useCategory();

  const timeout = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const ViewCategory = useCallback(() => {
    switch (category) {
      // case 'Classic':
      //   return <Classic setCategory={setCategory} animatedStyles={animatedStyleRank} />;
      case 'Rank':
        return <Rank setCategory={setCategory} animatedStyles={animatedStyleRank} />;
      default:
        return <Default setCategory={setCategory} animatedStyles={animatedStyleDefault} />;
    }
  }, [category]);

  const initialize = async () => {
    const userId = parseInt(realmUser?.id);
    const data = { ...user, userId };
    setLoadingSync(true);
    await timeout(5000);
    syncNewUser(data);
  };
  useEffect(() => {
    let subscribed = false;
    if (!subscribed) {
      initialize();
    }

    return () => {
      subscribed = true;
    };
  }, []);

  return (
    <Box flex="1">
      <Box bgColor={colors.primary} style={{ flex: 1, justifyContent: 'center' }}>
        {state.loadingSync ? <Loading /> : <ViewCategory />}
      </Box>
    </Box>
  );
};

//make this component available to the app
export default Dashboard;
