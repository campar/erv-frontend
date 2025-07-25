import {Structure} from "../../features/entities/structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {SearchField} from "../../core/entity-utils/search-field";
import {AppDate} from "../../shared/utils/app-date";

export class CheckInStatsReportStructure implements Structure {

  static #instance: CheckInStatsReportStructure;

  entityName: string = 'device';
  title: string = 'pass_statistics';
  fkSearchAttribute: string[] = [];
  attributes: Attribute[] = [
    new Attribute(
      'date',
      'date',
      SearchField.CALENDAR().required(true).maxLength(AppDate.now().toEndOfDay().toDate()).ranged(true).initDefaultValue(true)
    )
  ];

  private constructor() {
  }

  public static get instance(): CheckInStatsReportStructure {
    if (!CheckInStatsReportStructure.#instance) {
      CheckInStatsReportStructure.#instance = new CheckInStatsReportStructure();
    }
    return CheckInStatsReportStructure.#instance;
  }
}
