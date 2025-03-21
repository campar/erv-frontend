import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";

export class CardStructure implements Structure {

  static #instance: CardStructure;

  entityName: string = 'Card';
  title: string = 'cards';
  fkSearchAttribute: string[] = [''];
  attributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN()
    ),
    new Attribute(
      'rfid',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true).toLowerCase(true)
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
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'cardType',
      'enum',
      SearchField.DROPDOWN().multiSelect(true),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'expirationDate',
      'date',
      SearchField.CALENDAR().minLength(new Date()).ranged(true),
      InputField.CALENDAR().minLength(new Date()).required(true)
    ),
    new Attribute(
      'permanent',
      'boolean',
      null,
      InputField.CHECKBOX()
    )
  ];

  private constructor() {
  }

  public static get instance(): CardStructure {
    if (!CardStructure.#instance) {
      CardStructure.#instance = new CardStructure();
    }
    return CardStructure.#instance;
  }
}
