import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";
import {AppDate} from "../../../shared/utils/app-date";

export class TimetableStructure implements Structure {

  static #instance: TimetableStructure;

  entityName: string = 'Timetable';
  title: string = 'work_record';
  fkSearchAttribute: string[] = ['actionType', 'dateTime'];
  attributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true),
    ),
    new Attribute(
      'device',
      'Device',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'shift',
      'Shift',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'actionType',
      'enum',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'dateTime',
      'datetime-local',
      SearchField.CALENDAR().maxLength(AppDate.now().toEndOfDay().toDate()).ranged(true),
      InputField.CALENDAR().required(true).maxLength(new Date())
    )
  ];

  private constructor() {
  }

  public static get instance(): TimetableStructure {
    if (!TimetableStructure.#instance) {
      TimetableStructure.#instance = new TimetableStructure();
    }
    return TimetableStructure.#instance;
  }
}
