import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";

export class DeviceStructure implements Structure {

  static #instance: DeviceStructure;

  entityName: string = 'Device';
  title: string = 'devices';
  fkSearchAttribute: string[] = ['code', 'description'];
  attributes: Attribute[] = [
    new Attribute(
      'location',
      'Location',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'code',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'hardwareIdentifier',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'active',
      'boolean',
      SearchField.CHECKBOX(),
      InputField.CHECKBOX().required(true)
    ),
    new Attribute(
      'description',
      'string',
      SearchField.INPUT(),
      InputField.TEXTAREA().trim(true)
    ),
    new Attribute(
      'lastKnownIpAddress',
      'string'
    ),
    new Attribute(
      'lastOnlineAt',
      'datetime-local'
    )
  ];

  private constructor() {
  }

  public static get instance(): DeviceStructure {
    if (!DeviceStructure.#instance) {
      DeviceStructure.#instance = new DeviceStructure();
    }
    return DeviceStructure.#instance;
  }
}
