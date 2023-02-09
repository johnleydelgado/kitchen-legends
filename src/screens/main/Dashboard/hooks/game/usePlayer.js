import mongoose from 'mongoose';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRealm } from '../../../../../realm';
import { Room } from '../../../../../realm/models/Room';
export default function usePlayer() {
  const localRealm = useRealm();
  const { roomStatus } = useSelector((state) => state.user);

  const playersRealm = localRealm
    .objects(Room.name)
    .filtered('_id == $0', mongoose.Types.ObjectId(roomStatus.id));

  const [players, setPlayers] = useState(playersRealm);

  React.useEffect(() => {
    resetSelectionOfPlayer();
  }, []);

  const selectPlayerHandler = useCallback(
    (id) => {
      const playerArr = players.map((a) => {
        if (a._id.toString() === id.toString()) return { ...a, selected: true };
        return { ...a, selected: false };
      });
      setPlayers(playerArr);
    },
    [players]
  );

  const resetSelectionOfPlayer = () => {
    const tempArr = [];
    playersRealm[0].players.map((item) =>
      tempArr.push({ _id: item._id, createdAt: item.createdAt, name: item.name, selected: false })
    );
    setPlayers(tempArr);
  };

  return { players, roomStatus, selectPlayerHandler, resetSelectionOfPlayer };
}
