import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {GenericFormComponent} from "../generic-form/generic-form.component";
import {AppUtils} from "../../utils/app-utils";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {PrimeModule} from "../../prime/prime.modules";
import {ToastService} from "../../../core/services/toast.service";
import {Attribute} from "../../../core/entity-utils/attribute";
import {FormUtils} from "../../utils/form-utils";
import {AppDate} from "../../utils/app-date";
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-generic-insert-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    PrimeModule
  ],
  templateUrl: '../generic-form/generic-form.component.html',
  styleUrl: '../generic-form/generic-form.component.scss',
})
export class GenericInsertFormComponent extends GenericFormComponent {
  override fb: FormBuilder = inject(FormBuilder)
  this: any;
  protected toastService = inject(ToastService)
  protected router = inject(Router);
  protected readonly AppUtils = AppUtils;

  override ngOnInit() {
    super.ngOnInit();
    this.initPickListTarget();
    this.initPickListSource();
  }

  onSubmit(navigate = true, callback = () => {
  }): void {
    this.formSubmitting = true;
    if (this.form?.valid) {

      let body: {} = this.formatFormValues(this.form);

      this.insert(body, this.entity, () => {
        this.toastService.showSuccess(this.translationService.translate("created_successfully"));
        this.form?.reset();
        this.formSubmitting = false;
        if (navigate)
          this.router.navigate(['/' + AppUtils.toFirstLetterLowercase(this.entity)]).then();
        callback();
      }, (err: any) => {
        this.formSubmitting = false;
        console.error('Insert failed:', err);
      });
    } else {
      this.form?.markAllAsTouched();
      this.formSubmitting = false;
    }
  }

  getPlaceholder(attr: Attribute): string {
    return this.translationService.translate(AppUtils.toFirstLetterLowercase(this.entity) + '.' + attr.attr_name).concat(" ", attr.inputField?._required ? '*' : '');
  }

  // override initForm(formData: any): void {
  //   const formControls: { [key: string]: any } = this.attributes.reduce((controls, attr) => {
  //     // @ts-ignore
  //     controls[attr.attr_name] = [formData[attr.attr_name] || null, FormUtils.getInputValidators(attr)];
  //     return controls;
  //   }, {});
  //   this.form = this.fb.group(formControls);
  // }

  override initForm(formData: any): void {
    const formControls: { [key: string]: any } = this.attributes.reduce((controls, attr) => {
      // @ts-ignore
      controls[attr.attr_name] = [formData[attr.attr_name] || (attr.inputField?.isCheckbox() && attr.inputField?._required) ? false : null, FormUtils.getInputValidators(attr)];
      return controls;
    }, {});
    this.form = this.fb.group(formControls);

    this.attributes.forEach(attr => {
      const control = this.form?.get(attr.attr_name);
      if (!control) {
        console.warn(`Form control for '${attr.attr_name}' not found.`);
        return;
      }

      const formatFn = attr.inputField?._formatFunction;
      if (typeof formatFn === 'function') {
        control.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
          const formattedValue = formatFn(value);
          if (formattedValue !== value) {
            control.setValue(formattedValue, { emitEvent: false });
          }
        });
      }
    });
  }

  override initOptions(): void {
    for (let attr of this.attributes) {
      if (!attr.isForeignKey()) continue;
      if (attr.inputField?.isTreeSelect()) {
        this.getAll(attr.type, (data: any[]) => {
          this.options.set(attr.attr_name, FormUtils.convertDataToTreeNodes(data, attr, this.structure?.attributes || []));
        });
      } else if (attr.inputField?.isDropdown()) {
        this.getAll(attr.type, (data: any[]) => {
          this.options.set(attr.attr_name, data.map(e => {
            return {
              data: e,
              label: AppUtils.getDisplayValue(e, attr.type)
            }
          }));
        });
      } else {
        this.getAll(attr.type, (data: any[]) => {
          this.options.set(attr.attr_name, data);
        });
      }
    }
  }

  initPickListSource(): void {
    for (let attr of this.attributes) {
      if (!attr.isForeignKey()) continue;
      if (attr.inputField?.isPickList()) {
        this.getAll(attr.type, (data: any[]) => {
          this.pickListSource.set(attr.attr_name, data);
        });
      }
    }
  }

  initPickListTarget(): void {
    for (let attr of this.attributes) {
      if (!attr.isForeignKey()) continue;
      if (attr.inputField?.isPickList()) {
        this.pickListTarget.set(attr.attr_name, []);
      }
    }
  }

  protected override initAttributes(): Attribute[] {
    return this.structure?.attributes.filter(attr => attr.inputField !== null) ?? [];
  }

  protected formatFormValues(form: FormGroup): { [key: string]: any; } {
    let body = form.value;
    for (let attr of this.attributes) {

      if (attr.inputField?.isPickList()) {
        body[attr.attr_name] = this.pickListTarget.get(attr.attr_name);
      }
      if (!body[attr.attr_name]) continue;

      if (attr.inputField?.isTreeSelect()) {
        if(!attr.inputField._multiSelect){
          body[attr.attr_name] = body[attr.attr_name].data;
        }
      }
      if (attr.type === 'string' && attr.inputField?._trim && body[attr.attr_name]) {
        body[attr.attr_name] = body[attr.attr_name].toString().trim();
      }
      if (attr.inputField?._toLowerCase && body[attr.attr_name]) {
        body[attr.attr_name] = body[attr.attr_name].toString().toLowerCase();
      }
      if (attr.type !== 'datetime-local') continue;

      const control = form.get(attr.attr_name);
      body[attr.attr_name] = AppDate.from(control?.value).toString();
    }
    return body;
  }
}
