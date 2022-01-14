import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';

export class User{
  constructor(
    public id: number,
    public username: string,
    public email?: string,
    public emailVerifiedAt?: Date,
    public password?: string,
    public passwordConfirm?: string,
    public role?: string,
    public settings?: UserSettings,
    public createdAt?: Date,
    public updatedAt?: Date,
    public token?: string,
    public expiresIn?: Date
  ) {}
}

@Injectable({ providedIn: 'root' })
export class UserAdapter implements Adapter<User> {
  adapt(user: any): User {
    return new User(
      user.id,
      user.username,
      user.email,
      user.emailVerifiedAt,
      user.password,
      user.passwordConfirm,
      user.role,
      user.settings,
      user.createdAt,
      user.updatedAt,
      user.token,
      user.expiresIn
    );
  }
}
