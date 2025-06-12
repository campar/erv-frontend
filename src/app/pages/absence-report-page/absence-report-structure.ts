import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class AbsenceReportStructure implements Structure {

  static #instance: AbsenceReportStructure;

  entityName: string = 'user';
  title: string = 'attendance_report';
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
      SearchField.CALENDAR().required(true).maxLength(AppDate.now().toEndOfDay().toDate()).initDefaultValue(true),
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
      SearchField.TREE_SELECT()
    )
  ];

  private constructor() {
  }

  public static get instance(): AbsenceReportStructure {
    if (!AbsenceReportStructure.#instance) {
      AbsenceReportStructure.#instance = new AbsenceReportStructure();
    }
    return AbsenceReportStructure.#instance;
  }
}
