import { Food } from './food.model';
import { Settings } from './settings';
import { User } from './user';

export interface ApiResponse {
  success: boolean;
  message: string;
  data ?: object | User | Settings | Array<User> | Array<Food>;
  fields ?: Array<string>;
  token ?: string;
  expiresIn ?: Date;
}
