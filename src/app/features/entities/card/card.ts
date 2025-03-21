import {User} from '../user/user';

export class Card {
	rfid?: string;
	active?: boolean;
	description?: string;
	creationDate?: Date;
	expirationDate?: Date;
	// cardType?: cardType;
	user?: User;
}
