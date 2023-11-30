import {UserFactory, UserInfo} from "../../store/auth/auth.interface";

export class FactoryMethod implements UserFactory {
  public createModObj(sourceObj: any): UserInfo {
    return {
      user: {
        accessToken: sourceObj?.accessToken,
        email: sourceObj?.email,
        displayName: sourceObj?.displayName,
        phoneNumber: sourceObj?.phoneNumber,
        photoURL: sourceObj?.photoURL,
        lastLoginAt: sourceObj?.lastLoginAt,
      }
    }
  }
}

