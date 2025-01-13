import { Role } from '../role/role';
import { DepartmentUnit } from '../department-unit/department-unit';
import { Shift } from '../shift/shift';

export class User {
  id?: number;
	username?: string;
	password?: string;
	email?: string;
	creationDate?: Date;
	modifyDate?: Date;
	firstName?: string;
	lastName?: string;
	parentName?: string;
	recordNumber?: string;
	birthDate?: Date;
	jmbg?: string;
	jobTitle?: string;
	officeNumber?: string;
	avatar?: string;
	shifts?: Shift[];
	// userType?: userType;
	role?: Role;
	departmentUnit?: DepartmentUnit;
	adminAccessibleDepartmentUnits?: DepartmentUnit[];
}
