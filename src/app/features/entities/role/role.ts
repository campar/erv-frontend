import {User} from '../user/user';
import {Permission} from "../permission/permission";

export class Role {
  name?: string;
  description?: string;
  user?: User;
  permissionList?: Permission[];
}
