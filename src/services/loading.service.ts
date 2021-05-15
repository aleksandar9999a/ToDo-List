import { Notify } from 'quasar';

export class LoadingService {
  loading = 0;
  notify: Notify;
  dismiss: null | Function = null;

  constructor (notify: Notify) {
    this.notify = notify;
  }

  get isLoading () {
    return this.loading > 0;
  }

  startLoading () {
    this.loading += 1;

    if (this.loading === 1) {
      this.dismiss = this.notify.create({
        spinner: true,
        message: 'Please wait...'
      });
    }

    return this.loading;
  }

  stopLoading () {
    this.loading -= 1;

    if (this.loading <= 0 && typeof this.dismiss === 'function') {
      this.dismiss();
    }

    return this.loading;
  }
}

export default new LoadingService (Notify);