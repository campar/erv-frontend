import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";

export class RoleStructure implements Structure {

  static #instance: RoleStructure;

  entityName: string = 'Role';
  title: string = 'roles';
  fkSearchAttribute: string[] = ['name'];

  private constructor() {
  }

  public static get instance(): RoleStructure {
    if (!RoleStructure.#instance) {
      RoleStructure.#instance = new RoleStructure();
    }
    return RoleStructure.#instance;
  }

  attributes: Attribute[] = [
    new Attribute(
      'name',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'description',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'permissionList',
      'Permission',
      SearchField.PICK_LIST(),
      InputField.PICK_LIST()
    )
  ];
}
