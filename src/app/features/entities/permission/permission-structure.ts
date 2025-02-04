import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";

export class PermissionStructure implements Structure {

  static #instance: PermissionStructure;

  entityName: string = 'Permission';
  title: string = 'permissions';
  fkSearchAttribute: string[] = ['name'];
  attributes: Attribute[] = [
    new Attribute(
      'name',
      'string',
      SearchField.INPUT()
    ),
    new Attribute(
      'description',
      'string')
  ];

  private constructor() {
  }

  public static get instance(): PermissionStructure {
    if (!PermissionStructure.#instance) {
      PermissionStructure.#instance = new PermissionStructure();
    }
    return PermissionStructure.#instance;
  }
}
