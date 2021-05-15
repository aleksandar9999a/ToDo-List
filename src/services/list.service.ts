// Plugins
import { v4 as uuidv4 } from 'uuid';

// Entities
import { LISTS_ENTITY } from 'src/config/entities';

// Services
import { firestore } from './firebase.service';
import loadingService, { LoadingService } from './loading.service';
import notificationsService, { NotificationsService } from './notifications.service';

// Interfaces
import { INewList, IList } from 'src/intefaces';

export class ListService {
  private loadingService: LoadingService;
  private notificationsService: NotificationsService;

  constructor (loadingService: LoadingService, notificationsService: NotificationsService) {
    this.loadingService = loadingService;
    this.notificationsService = notificationsService;
  }

  get (id: string) {
    this.loadingService.startLoading();

    return firestore
      .collection(LISTS_ENTITY)
      .doc(id)
      .get()
      .then(snapshot => {
        return snapshot.data() as IList;
      })
      .catch((error: Error) => {
        this.notificationsService.addErrorNotification(error.message);
      })
      .finally(() => {
        this.loadingService.stopLoading();
      })
  }

  create (data: INewList) {
    this.loadingService.startLoading();

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
      .catch((error: Error) => {
        this.notificationsService.addErrorNotification(error.message);
      })
      .finally(() => {
        this.loadingService.stopLoading();
      })
  }

  update (id: string, update: { [key: string]: string }) {
    this.loadingService.startLoading();

    return firestore
      .collection(LISTS_ENTITY)
      .doc(id)
      .update(update)
      .catch((error: Error) => {
        this.notificationsService.addErrorNotification(error.message);
      })
      .finally(() => {
        this.loadingService.stopLoading();
      })
  }

  delete (id: string) {
    return this.update(id, { state: 'inactive' });
  }
}

export default new ListService(loadingService, notificationsService);