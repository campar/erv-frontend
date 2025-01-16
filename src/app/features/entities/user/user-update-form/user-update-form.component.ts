import {Component, EventEmitter, inject} from '@angular/core';
import {
  GenericUpdateFormComponent
} from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {CardAttachmentFormComponent} from "../card-attachment-form/card-attachment-form.component";
import {AppUtils} from "../../../../shared/utils/app-utils";
import {UserFormUtils} from "../user-form-utils";
import {UserService} from '../../../services/user.service';
import {UserType} from "../../enums.model";
import { PermissionService } from '../../../../core/services/permission.service';
import { DepartmentUnit } from '../../department-unit/department-unit';

@Component({
  selector: 'app-user-update-form',
  standalone: true,
  imports: [
    GenericUpdateFormComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    PrimeModule,
    ReactiveFormsModule,
    CardAttachmentFormComponent,
  ],
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css', '../../../../shared/components/generic-form/generic-form.component.scss']
})

export class UserUpdateFormComponent extends GenericUpdateFormComponent {
  isEmployee: boolean = true;
  passwordUpdateVisible: boolean = false;
  passwordForm!: FormGroup;
  protected readonly UserFormUtils = UserFormUtils;
  protected readonly UserType = UserType;
  private userService = inject(UserService)
  permissionService = inject(PermissionService);

  override onSubmit(navigate: boolean = true, callback: () => void = () => {
  }) {
    if (this.form?.valid) {
      let body: {} = this.prepareUpdateBody(this.form);
      // (body as any)['shifts'] = [(body as any)['shifts']];
      (body as any)['id'] = this.id;
      this.update(body, this.entity, () => {
        this.toastService.showSuccess(this.translationService.translate("updated_successfully"));
        this.form?.reset();
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

  protected override prepareUpdateBody(form: { [key: string]: any; }): { [key: string]: any; } {
    let body = super.prepareUpdateBody(form);
    for (let attr of this.attributes) {
        if (attr.inputField?.isTreeSelect()) {
          if(attr.inputField._multiSelect && attr.attr_name === 'adminAccessibleDepartmentUnits' && attr.type === 'DepartmentUnit'){
            if(!this.form?.get(attr.attr_name)?.value) {
              body[attr.attr_name] = [];
            }else if (Array.isArray(this.form?.get(attr.attr_name)?.value)) {
              body[attr.attr_name] = this.form?.get(attr.attr_name)?.value.map((item: any) => item.data as DepartmentUnit);
            } else {
              body[attr.attr_name] = this.form?.get(attr.attr_name)?.value as DepartmentUnit;
            }
          }
        }
    }
    return body;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initPasswordForm();
    this.form?.get('userType')?.valueChanges.subscribe(value => {
      this.isEmployee = value === 'EMPLOYEE' || value === null;
      UserFormUtils.toggleAdminFieldsForUpdateForm(value, this.form);
    });
  }

  showPasswordChangeDialog() {
    this.passwordUpdateVisible = true;
  }

  closePasswordChangeDialog() {
    this.passwordUpdateVisible = false;
  }

  onSubmitPasswordForm() {
    if (this.passwordForm.valid) {
      const formData = this.data;
      formData['password'] = this.passwordForm.controls['password'].value;
      this.performSubscription(this.userService.setPassword(formData), (data: any) => {
        this.closePasswordChangeDialog();
        this.data = data.data
        this.toastService.showSuccess('updated_successfully');
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  isTargetUserOfType(type: UserType) {
    return this.data['userType'] === type;
  }

  private initPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required]
      },
      {validator: this.passwordMatchValidator}
    );
  }
}
