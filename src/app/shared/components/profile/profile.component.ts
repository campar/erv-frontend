import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../../prime/prime.modules";
import {AuthService} from "../../../core/services/auth.service";
import {RootComponent} from "../../root/root.component";
import {ApiService} from "../../../core/services/api.service";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {LogicalOperator} from "../../../core/entity-utils/logical-operator";
import {SearchOperator} from "../../../core/entity-utils/search-operator";
import {User} from "../../../features/entities/user/user";
import {BadgeModule} from "primeng/badge";
import {PanelModule} from "primeng/panel";
import {TreeNode} from "primeng/api";
import {ScrollPanel, ScrollPanelModule} from "primeng/scrollpanel";
import {FormUtils} from "../../utils/form-utils";
import {Attribute} from "../../../core/entity-utils/attribute";
import {CustomScrollPanelComponent} from "../custom-scroll-panel/custom-scroll-panel.component";
import {TabViewModule} from "primeng/tabview";
import {DividerModule} from "primeng/divider";
import {GenericUpdateFormComponent} from "../generic-update-form/generic-update-form.component";
import {UserStructure} from "../../../features/entities/user/user-structure";
import {AppUtils} from "../../utils/app-utils";
import {TranslationService} from "../../../core/services/translation.service";
import {PasswordModule} from "primeng/password";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastService} from "../../../core/services/toast.service";

const departmentUnitAttribute = new Attribute('departmentUnit', 'DepartmentUnit');

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PrimeModule, BadgeModule, PanelModule, ScrollPanelModule, CustomScrollPanelComponent, TabViewModule, DividerModule, GenericUpdateFormComponent, PasswordModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends RootComponent implements OnInit {
  user!: User;
  departmentUnit: TreeNode[] = [];
  personalSettingsAttributes: Attribute[] = UserStructure.instance.attributes;
  @ViewChild('scrollPanel') scrollPanel: ScrollPanel | undefined; // Reference to p-scrollPanel
  passwordForm!: FormGroup;


  authService = inject(AuthService);
  apiService = inject(ApiService);
  protected readonly AppUtils = AppUtils;
  private translationService = inject(TranslationService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadDepartmentUnitData();
    this.initPersonalSettings();
    this.initPasswordForm();
  }

  public getPlaceholder(attr: Attribute): string {
    return this.translationService.translate('user.' + attr.attr_name);
  }

  getUserAttributeValue(attr: Attribute) {
    if (attr.isForeignKey()) {
      return AppUtils.getEntityViewValue((this.user as any)[attr.attr_name], attr.type, " ");
    }
    return (this.user as any)[attr.attr_name];
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  onSubmitPasswordForm() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      formData.id = this.user.id;
      this.performSubscription(this.authService.changePassword(formData), () => {
        this.toastService.showSuccess('updated_successfully');
      });
    } else {
      // Mark all controls as touched to trigger validation errors
      this.passwordForm.markAllAsTouched();
    }
  }

  private loadDepartmentUnitData() {
    this.performSubscription(this.apiService.getAll('departmentUnit'), (data: any[]) => {
      this.departmentUnit = FormUtils.convertDataToTreeNodes(data, departmentUnitAttribute, [departmentUnitAttribute], true, true);
    });
  }

  private loadUserData() {
    let userQuery: SearchDTO = {
      pageNumber: 0,
      pageSize: 1,
      sort: [],
      filterGroup: {
        logicalOperator: LogicalOperator.AND,
        filters: [{
          key: 'username',
          searchOperator: SearchOperator.EQUAL,
          value: this.authService.getUsername()
        }]
      }
    }
    this.performSubscription(this.apiService.search(userQuery, 'user'), (data: any) => {
      this.user = data.content[0];
    });
  }

  private initPersonalSettings() {
    this.personalSettingsAttributes = this.personalSettingsAttributes.filter(e => [
      'firstName',
      'lastName',
      'username',
      'email',
      'departmentUnit'
    ].includes(e.attr_name));
  }

  private initPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/)]],
        newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/)]]
      },
      {validator: this.passwordMatchValidator}
    );
  }
}
