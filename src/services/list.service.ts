import { INewList, IList } from 'src/intefaces';
import { firestore } from './firebase.service';
import { v4 as uuidv4 } from 'uuid';
import { LISTS_ENTITY } from 'src/config/entities';

export class ListService {
  get (id: string) {
    return firestore
      .collection(LISTS_ENTITY)
      .doc(id)
      .get()
      .then(snapshot => {
        return snapshot.data() as IList;
      })
  }

  create (data: INewList) {
    const list = {
      ...data,
      id: uuidv4(),
      state: 'active'
    }

    return firestore
      .collection(LISTS_ENTITY)
      .doc(list.id)
      .set(list)
      .then(() => {
        return list as IList;
      })
  }

  update (id: string, update: { [key: string]: string }) {
    return firestore
      .collection(LISTS_ENTITY)
      .doc(id)
      .update(update)
  }

  delete (id: string) {
    return this.update(id, { state: 'inactive' });
  }
}

export default new ListService();