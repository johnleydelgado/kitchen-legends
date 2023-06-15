import { find, findIndex, isEmpty } from 'lodash';
import mongoose from 'mongoose';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRealm } from '../../../../../realm';
import { Record } from '../../../../../realm/models/Record';
import { Room } from '../../../../../realm/models/Room';
export default function useRecord(players) {
  const { roomStatus } = useSelector((state) => state.user);

  const selectedPlayer = find(players, { selected: true });

  const localRealm = useRealm();

  const roomRealm = localRealm
    .objects(Room.name)
    .filtered('_id == $0', mongoose.Types.ObjectId(roomStatus.id));

  const scoringHandler = (score) => {
    try {
      localRealm.write(() => {
        const { records } = roomRealm[0];
        const index = findIndex(records, (a) => a.player._id.equals(selectedPlayer._id));
        // console.log('score', score);
        // console.log('taa', records[0].player._id, mongoose.Types.ObjectId(selectedPlayer._id));
        if (index === -1) {
          // create record
          const record = localRealm.create(
            Record.name,
            new Record({ score, player: selectedPlayer }),
            true
          );
          records.push(record); // add record in Room
        } else {
          // update
          const record = records[index];
          console.log('aaa', record.score + score);
          roomRealm[0].records[index].score = record.score + score;
        }
      });
    } catch (e) {
      console.log('Err:', e);
    }
  };

  return { scoringHandler };
}
