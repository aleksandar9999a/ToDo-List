// Quasar
import { Notify } from 'quasar';

export class NotificationsService {
  private notify: Notify;

  constructor (notify: Notify) {
    this.notify = notify;
  }

  addNotification (message: string, color: string) {
    return this.notify.create({
      message,
      color,
      timeout: 2500,
      actions: [{ icon: 'close', color: 'white' }]
    });
  }

  addErrorNotification (message: string) {
    return this.addNotification(message, 'negative');
  }

  addSuccessNotification (message: string) {
    return this.addNotification(message, 'positive');
  }

  addWarningNotification (message: string) {
    return this.addNotification(message, 'warning');
  }
}

export default new NotificationsService (Notify);