import { Auth } from 'aws-amplify';
import { makeObservable, observable, runInAction } from 'mobx';
import { OutputData } from 'services/output/OutputTypes';
import api from '../services';

export class AuthStore {
  user: any | null = null;

  constructor() {
    makeObservable(this, { user: observable });
  }

  // async loadUser() {
  //   try {
  //     const user = (await Auth.currentAuthenticatedUser()) as string;
  //     console.log(user);
  //     runInAction(() => {
  //       // this.user = user as null;
  //     });
  //   } catch {
  //     console.log('error');
  //   }
  // }
}

export const authStore = new AuthStore();
