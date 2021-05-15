// Entities
import { USERS_ENTITY } from 'src/config/entities';

// Services
import { auth, firestore } from './firebase.service';
import loadingService, { LoadingService } from './loading.service';
import notificationsService, { NotificationsService } from './notifications.service';

// Interfaces
import { INewUser, IUser } from 'src/intefaces';

export class UserService {
  user: null | IUser;

  private loadingService: LoadingService;
  private notificationsService: NotificationsService;

  constructor (loadingService: LoadingService, notificationsService: NotificationsService) {
    this.loadingService = loadingService;
    this.notificationsService = notificationsService;
    this.user = null;
  }

  getCurrentUser (fn: (user: IUser | null) => void) {
    return auth.onAuthStateChanged(user => {
      if (!user) {
        fn(null);
        this.user = null;
        return Promise.resolve(null)
      }

      return this.get(user.uid)
        .then(userdata => {
          this.user = userdata || null;
          fn(userdata || null);
        })
    })
  }

  get (id: string) {
    this.loadingService.startLoading();

    return firestore
      .collection(USERS_ENTITY)
      .doc(id)
      .get()
      .then(snapshot => {
        return snapshot.data() as IUser;
      })
      .catch((error: Error) => {
        this.notificationsService.addErrorNotification(error.message);
      })
      .finally(() => {
        this.loadingService.stopLoading();
      })
  }

  create ({ email, password }: INewUser) {
    this.loadingService.startLoading();

    return auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const userdata = {
          id: res.user?.uid,
          email: email,
          state: 'active'
        }

        return firestore
          .collection(USERS_ENTITY)
          .doc(userdata.id)
          .set(userdata)
          .then(() => {
            return userdata as IUser;
          })
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
      .collection(USERS_ENTITY)
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
    return this.update(id, { state: 'inactive' })
  }
}

export default new UserService(loadingService, notificationsService);