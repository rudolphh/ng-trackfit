import { Settings } from "./settings";
import { User } from "./user";

export interface ApiResponse {
  success: boolean;
  message: string;
  data ?: object | User | Settings | Array<User>;
  fields ?: Array<string>;
}
