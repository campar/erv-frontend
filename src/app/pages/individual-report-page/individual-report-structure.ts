import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class IndividualReportStructure implements Structure {

  static #instance: IndividualReportStructure;

  entityName: string = 'timetable';
  title: string = 'individual_report';
  fkSearchAttribute: string[] = ['firstName', 'parentName', 'lastName'];
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
    ),
  ];

  private constructor() {
  }

  public static get instance(): IndividualReportStructure {
    if (!IndividualReportStructure.#instance) {
      IndividualReportStructure.#instance = new IndividualReportStructure();
    }
    return IndividualReportStructure.#instance;
  }
}
