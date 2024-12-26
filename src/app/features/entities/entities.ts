import {UserStructure} from "./user/user-structure";
import {User} from "./user/user";
import {ShiftStructure} from "./shift/shift-structure";
import {Shift} from "./shift/shift";
import {RoleStructure} from "./role/role-structure";
import {Role} from "./role/role";
import {PermissionStructure} from "./permission/permission-structure";
import {Permission} from "./permission/permission";
import {TimetableStructure} from "./timetable/timetable-structure";
import {Timetable} from "./timetable/timetable";
import {DepartmentUnitStructure} from "./department-unit/department-unit-structure";
import {DepartmentUnit} from "./department-unit/department-unit";
import {DeviceStructure} from "./device/device-structure";
import {Device} from "./device/device";
import {LocationStructure} from "./location/location-structure";
import {Location} from "./location/location";
import {CardStructure} from "./card/card-structure";
import {Card} from "./card/card";

export const entities = [
  {
    name: "User",
    structure: UserStructure.instance,
    type: User,
  },
  {
    name: "Shift",
    structure: ShiftStructure.instance,
    type: Shift,
  },
  {
    name: "Role",
    structure: RoleStructure.instance,
    type: Role,
  },
  {
    name: "Permission",
    structure: PermissionStructure.instance,
    type: Permission,

  },
  {
    name: "Timetable",
    structure: TimetableStructure.instance,
    type: Timetable,
  },
  {
    name: "DepartmentUnit",
    structure: DepartmentUnitStructure.instance,
    type: DepartmentUnit,

  },
  {
    name: "Device",
    structure: DeviceStructure.instance,
    type: Device,

  },
  {
    name: "Location",
    structure: LocationStructure.instance,
    type: Location,

  },
  {
    name: "Card",
    structure: CardStructure.instance,
    type: Card,

  },
]
