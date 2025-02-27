import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";

export class DepartmentUnitStructure implements Structure {

  static #instance: DepartmentUnitStructure;

  entityName: string = 'DepartmentUnit';
  title: string = 'department_unit';
  fkSearchAttribute: string[] = ['name'];
  attributes: Attribute[] = [
    new Attribute(
      'parent',
      'DepartmentUnit',
      SearchField.TREE_SELECT(),
      InputField.TREE_SELECT().multiSelect(false)
    ),
    new Attribute(
      'name',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'code',
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

  public static get instance(): DepartmentUnitStructure {
    if (!DepartmentUnitStructure.#instance) {
      DepartmentUnitStructure.#instance = new DepartmentUnitStructure();
    }
    return DepartmentUnitStructure.#instance;
  }
}
