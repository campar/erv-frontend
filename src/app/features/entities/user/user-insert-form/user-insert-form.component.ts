import {Component, EventEmitter} from '@angular/core';
import {
  GenericInsertFormComponent
} from "../../../../shared/components/generic-insert-form/generic-insert-form.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "../../../../core/pipes/translate.pipe";
import {User} from "../user";
import {AppUtils} from "../../../../shared/utils/app-utils";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {UserFormUtils} from "../user-form-utils";
import {CardAttachmentFormComponent} from "../card-attachment-form/card-attachment-form.component";
import {PasswordModule} from "primeng/password";
import { DepartmentUnit } from '../../department-unit/department-unit';

@Component({
  selector: 'app-user-insert-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    TranslatePipe,
    PrimeModule,
    ReactiveFormsModule,
    CardAttachmentFormComponent,
    PasswordModule
  ],
  templateUrl: './user-insert-form.component.html',
  styleUrls: ['./user-insert-form.component.scss', '../../../../shared/components/generic-form/generic-form.component.scss'],
})

export class UserInsertFormComponent extends GenericInsertFormComponent {
  isEmployee: boolean = true;
  createdUser!: User;
  protected readonly UserFormUtils = UserFormUtils;

  override onSubmit(navigate: boolean = true, callback: () => void = () => {
  }) {
    if (this.form?.valid) {
      let body: {} = this.formatFormValues(this.form);
      // (body as any)['shifts'] = [(body as any)['shifts']];
      this.insert(body, this.entity, (data: User) => {
        this.createdUser = data;
        this.toastService.showSuccess(this.translationService.translate("created_successfully"));
        this.form?.reset();
        if (navigate)
          this.router.navigate(['/' + AppUtils.toFirstLetterLowercase(this.entity)]).then();

        // Check if the callback is an EventEmitter and emit the event, otherwise just call it as a function
        if (callback instanceof EventEmitter) {
          callback.emit();
        } else {
          callback();
        }
      });
    } else {
      this.form?.markAllAsTouched();
    }
  }

  protected override formatFormValues(form: FormGroup): { [key: string]: any; } {
    let body = super.formatFormValues(form);
    for (let attr of this.attributes) {
      if (attr.inputField?.isTreeSelect()) {
        if(attr.inputField._multiSelect && attr.attr_name === 'adminAccessibleDepartmentUnits' && attr.type === 'DepartmentUnit'){
          if(!body[attr.attr_name]) body[attr.attr_name] = [];
          if (Array.isArray(body[attr.attr_name])) {
            body[attr.attr_name] = body[attr.attr_name].map((item: any) => item.data as DepartmentUnit);
          } else if (body[attr.attr_name]) {
            body[attr.attr_name] = body[attr.attr_name].data as DepartmentUnit;
          }
        }
      }
    }
    return body;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.form?.get('userType')?.valueChanges.subscribe(value => {
      this.isEmployee = value === 'EMPLOYEE' || value === null;
      if (this.isEmployee) {
        this.form?.get('password')?.setValue(null);
        this.form?.get('username')?.setValue(null);
        this.form?.get('role')?.setValue(null);
        this.form?.get('adminAccessibleDepartmentUnits')?.setValue(null);
      }
      UserFormUtils.toggleAdminFields(value, this.form);
    });
  }
}
