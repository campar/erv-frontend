import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class DailyReportStructure implements Structure {

  static #instance: DailyReportStructure;

  entityName: string = 'user';
  title: string = 'daily_report';
  fkSearchAttribute: string[] = [];
  attributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
      SearchField.DROPDOWN()
    ),
    new Attribute(
      'dateTime',
      'date',
      SearchField.CALENDAR().required(true).initDefaultValue(true).maxLength(AppDate.now().toEndOfDay().toDate())
    ),
    new Attribute(
      'recordNumber',
      'string',
      SearchField.INPUT()
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
      SearchField.TREE_SELECT()
    )
  ];

  private constructor() {
  }

  public static get instance(): DailyReportStructure {
    if (!DailyReportStructure.#instance) {
      DailyReportStructure.#instance = new DailyReportStructure();
    }
    return DailyReportStructure.#instance;
  }
}
