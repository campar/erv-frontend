import {Attribute} from "../../../core/entity-utils/attribute";
import {FormGroup, Validators} from "@angular/forms";
import {UserType} from "../enums.model";

export class UserFormUtils {

  static nonAdminAttributes(attributes: Attribute[]): Attribute[] {
    return attributes.filter(e => !['password', 'username', 'role', 'adminAccessibleDepartmentUnits'].includes(e.attr_name));
  }

  static adminAttributes(attributes: Attribute[]): Attribute[] {
    const order = ['username', 'role', 'password', 'adminAccessibleDepartmentUnits'];
    
    return attributes.filter(e => order.includes(e.attr_name)).sort((a, b) => order.indexOf(a.attr_name) - order.indexOf(b.attr_name));
  }
  

  static toggleAdminFields(userType: string, form: FormGroup | undefined) {
    const passwordControl = form?.get('password');
    if (userType === 'ADMIN') {
      passwordControl?.setValidators([Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/)
      ]);
      passwordControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      passwordControl?.clearValidators();
      passwordControl?.updateValueAndValidity(); // Recalculate validity
    }
    const usernameControl = form?.get('username');
    if (userType === UserType.ADMIN) {
      usernameControl?.setValidators([Validators.required]);
      usernameControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      usernameControl?.clearValidators();
      usernameControl?.updateValueAndValidity(); // Recalculate validity
    }
    const roleControl = form?.get('role');
    if (userType === UserType.ADMIN) {
      roleControl?.setValidators([Validators.required]);
      roleControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      roleControl?.clearValidators();
      roleControl?.updateValueAndValidity(); // Recalculate validity
    }
    const adminAccessibleDepartmentUnitsControl = form?.get('adminAccessibleDepartmentUnits');
    if (userType === UserType.ADMIN) {
      adminAccessibleDepartmentUnitsControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      adminAccessibleDepartmentUnitsControl?.clearValidators();
      adminAccessibleDepartmentUnitsControl?.updateValueAndValidity(); // Recalculate validity
    }
  }

  static toggleAdminFieldsForUpdateForm(userType: string, form: FormGroup | undefined) {
    const passwordControl = form?.get('password');
    passwordControl?.clearValidators();
    passwordControl?.updateValueAndValidity(); // Recalculate validity
    const usernameControl = form?.get('username');
    if (userType === UserType.ADMIN) {
      usernameControl?.setValidators([Validators.required]);
      usernameControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      usernameControl?.clearValidators();
      usernameControl?.updateValueAndValidity(); // Recalculate validity
    }
    const roleControl = form?.get('role');
    if (userType === UserType.ADMIN) {
      roleControl?.setValidators([Validators.required]);
      roleControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      roleControl?.clearValidators();
      roleControl?.updateValueAndValidity(); // Recalculate validity
    }
    const adminAccessibleDepartmentUnitsControl = form?.get('adminAccessibleDepartmentUnits');
    if (userType === UserType.ADMIN) {
      adminAccessibleDepartmentUnitsControl?.updateValueAndValidity(); // Recalculate validity
    } else {
      adminAccessibleDepartmentUnitsControl?.clearValidators();
      adminAccessibleDepartmentUnitsControl?.updateValueAndValidity(); // Recalculate validity
    }
  }

}
