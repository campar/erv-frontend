import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";

export class LocationStructure implements Structure {

  static #instance: LocationStructure;

  entityName: string = 'Location';
  title: string = 'locations';
  fkSearchAttribute: string[] = ['name', 'address', 'city'];
  attributes: Attribute[] = [
    new Attribute(
      'name',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'address',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'city',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'phone',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'description',
      'string',
      SearchField.INPUT(),
      InputField.TEXTAREA().trim(true)
    )
  ];

  private constructor() {
  }

  public static get instance(): LocationStructure {
    if (!LocationStructure.#instance) {
      LocationStructure.#instance = new LocationStructure();
    }
    return LocationStructure.#instance;
  }
}
