import { Settings } from "./settings";

export interface User {
  _id ?: number;
  username ?: string;
  email ?: string;
  email_verified_at ?: Date;
  password ?: string;
  passwordConfirm ?: string;
  role ?: string;
  settings ?: Settings;
  created_at ?: Date;
  updated_at ?: Date;
  token ?: string;
  expiresIn ?: Date;
  id ?: string;
}
