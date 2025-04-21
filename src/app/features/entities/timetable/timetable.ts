import { User } from '../user/user';
import { Shift } from '../shift/shift';
import { Device } from '../device/device';

export class Timetable {
	// actionType?: actionType;
	image?: string;
	dateTime?: Date;
	user?: User;
	shift?: Shift;
	device?: Device;
}
