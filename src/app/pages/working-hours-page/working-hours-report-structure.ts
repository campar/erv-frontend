import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class WorkingHoursReportStructure implements Structure {

  static #instance: WorkingHoursReportStructure;

  entityName: string = 'user';
  title: string = 'work_hours_calculation';
  fkSearchAttribute: string[] = [];
  attributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
      SearchField.DROPDOWN()
    ),
    new Attribute(
      'date',
      'date',
      SearchField.CALENDAR().required(true).maxLength(AppDate.now().toEndOfDay().toDate()).ranged(true).initDefaultValue(true)
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
      SearchField.TREE_SELECT()
    )
  ];

  private constructor() {
  }

  public static get instance(): WorkingHoursReportStructure {
    if (!WorkingHoursReportStructure.#instance) {
      WorkingHoursReportStructure.#instance = new WorkingHoursReportStructure();
    }
    return WorkingHoursReportStructure.#instance;
  }
}
