import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class PauseReportStructure implements Structure {

  static #instance: PauseReportStructure;

  entityName: string = 'timetable';
  title: string = 'pause_report';
  fkSearchAttribute: string[] = [];
  attributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
      SearchField.DROPDOWN().required(true)
    ),
    new Attribute(
      'date',
      'date',
      SearchField.CALENDAR().required(true).maxLength(AppDate.now().toEndOfDay().toDate()).ranged(true).initDefaultValue(true)
    )
  ];

  private constructor() {
  }

  public static get instance(): PauseReportStructure {
    if (!PauseReportStructure.#instance) {
      PauseReportStructure.#instance = new PauseReportStructure();
    }
    return PauseReportStructure.#instance;
  }
}
