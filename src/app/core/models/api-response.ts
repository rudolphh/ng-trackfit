import { Food } from './food.model';
import { User } from './user';
import { UserSettings } from './userSettings';

export interface ApiResponse {
  success: boolean;
  message: string;
  data ?: object | User | UserSettings | Array<User> | Array<Food>;
  fields ?: Array<string>;
  token ?: string;
  expiresIn ?: Date;
}
