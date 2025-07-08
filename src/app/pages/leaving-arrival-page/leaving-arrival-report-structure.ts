import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class LeavingArrivalReportStructure implements Structure {

  static #instance: LeavingArrivalReportStructure;

  entityName: string = 'user';
  title: string = 'delays_departures';
  fkSearchAttribute: string[] = [];
  attributes: Attribute[] = [
    new Attribute(
      'date',
      'date',
      SearchField.CALENDAR().required(true).maxLength(AppDate.now().toEndOfDay().toDate()).ranged(true).initDefaultValue(true)
    ),
    new Attribute(
      'shift',
      'Shift',
      SearchField.DROPDOWN().multiSelect(true)
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
      SearchField.TREE_SELECT().multiSelect(true)
    ),
    new Attribute(
      'showErrorsOnly',
      'boolean',
      SearchField.CHECKBOX()
    )
  ];

  private constructor() {
  }

  public static get instance(): LeavingArrivalReportStructure {
    if (!LeavingArrivalReportStructure.#instance) {
      LeavingArrivalReportStructure.#instance = new LeavingArrivalReportStructure();
    }
    return LeavingArrivalReportStructure.#instance;
  }
}
