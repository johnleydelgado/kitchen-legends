import { realmSync } from '../../realm';

export const syncOfflineToOnline = async (app, name, id, schema) => {
  const syncRealm = await realmSync(app);

  const onlineData = syncRealm.objects(name).filtered('_id == $0', id);
  //   if not exist
  if (onlineData.length === 0) {
    syncRealm.write(async () => {
      const createdPlayer = syncRealm.create(
        name,
        new schema({ id: localItem._id, name: localItem.name })
      );
    });
  }
};
