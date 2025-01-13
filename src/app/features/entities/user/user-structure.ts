import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";
import {Validators} from "@angular/forms";

export class UserStructure implements Structure {

  static #instance: UserStructure;

  entityName: string = 'User';
  title: string = 'user.title';
  fkSearchAttribute: string[] = ['firstName', 'lastName', 'parentName'];
  attributes: Attribute[] = [
    new Attribute(
      'firstName',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'parentName',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'lastName',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'jmbg',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().minLength(13).maxLength(13).trim(true)
    ),
    new Attribute(
      'jobTitle',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
      SearchField.TREE_SELECT().multiSelect(true),
      InputField.TREE_SELECT().required(true).multiSelect(false)
    ),
    new Attribute(
      'adminAccessibleDepartmentUnits',
      'DepartmentUnit',
      null,
      InputField.TREE_SELECT().required(false).multiSelect(true)
    ),
    new Attribute(
      'username',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).trim(true)
    ),
    new Attribute(
      'email',
      'email',
      SearchField.INPUT(),
      InputField.INPUT().trim(true).validators([Validators.email]).trim(true)
    ),
    new Attribute(
      'password',
      'string',
      null,
      InputField.INPUT().required(true).validators([Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\\w\\s])[A-Za-z\\d\\W]{8,}$/)])
    ),
    new Attribute(
      'recordNumber',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().trim(true)
    ),
    new Attribute(
      'birthDate',
      'date',
      SearchField.CALENDAR(),
      InputField.CALENDAR()
    ),
    new Attribute(
      'userType',
      'enum',
      SearchField.DROPDOWN().multiSelect(true),
      InputField.DROPDOWN().required(true)
    ),
    new Attribute(
      'shifts',
      'Shift',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().multiSelect(true)
    ),
    new Attribute(
      'role',
      'Role',
      SearchField.DROPDOWN(),
      InputField.DROPDOWN().required(true)
    )
  ];

  private constructor() {
  }

  public static get instance(): UserStructure {
    if (!UserStructure.#instance) {
      UserStructure.#instance = new UserStructure();
    }
    return UserStructure.#instance;
  }
}
