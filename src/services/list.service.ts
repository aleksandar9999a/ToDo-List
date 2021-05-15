// Plugins
import { v4 as uuidv4 } from 'uuid';

// Entities
import { LISTS_ENTITY } from 'src/config/entities';

// Services
import { firestore } from './firebase.service';
import loadingService, { LoadingService } from './loading.service';
import notificationsService, { NotificationsService } from './notifications.service';
import userService, { UserService } from './user.service';
import helper, { Helper } from './helper';

// Interfaces
import { INewList, IList } from 'src/intefaces';


export class ListService {
  private loadingService: LoadingService;
  private notificationsService: NotificationsService;
  private userService: UserService;
  private helper: Helper;

  constructor (
    loadingService: LoadingService,
    notificationsService: NotificationsService,
    userService: UserService,
    helper: Helper
  ) {
    this.helper = helper;
    this.userService = userService
    this.loadingService = loadingService;
    this.notificationsService = notificationsService;
  }

  getAll (): Promise<void | IList[]> {
    if (!this.userService.user) {
      if (this.userService.loading.value) {
        return this.helper.executeAfterTime(this.getAll.bind(this));
      }

      return Promise.resolve([]);
    }

    this.loadingService.startLoading();

    return firestore
      .collection(LISTS_ENTITY)
      .where('creator', '==', this.userService.user.id)
      .where('state', '==', 'active')
      .get()
      .then(shot => {
        return shot.docs.map(doc => doc.data()) as IList[];
      })
      .catch((error: Error) => {
        this.notificationsService.addErrorNotification(error.message);
      })
      .finally(() => {
        this.loadingService.stopLoading();
      })
  }

  get (id: string): Promise<IList | void | null> {
    if (!this.userService.user) {
      if (this.userService.loading.value) {
        return this.helper.executeAfterTime(this.get.bind(this, id));
      }

      return Promise.resolve(null);
    }

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
    if (!this.userService.user) {
      return Promise.reject(new Error('User is not authenticated!'))
        .catch((error: Error) => {
          this.notificationsService.addErrorNotification(error.message);
        })
    }

    this.loadingService.startLoading();

    const list = {
      ...data,
      id: uuidv4(),
      state: 'active',
      date: new Date(),
      creator: this.userService.user.id
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

export default new ListService(loadingService, notificationsService, userService, helper);