import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AppUtils} from "../../../../shared/utils/app-utils";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {Attribute} from "../../../../core/entity-utils/attribute";
import {TranslationService} from "../../../../core/services/translation.service";
import {FormUtils} from "../../../../shared/utils/form-utils";
import {RootComponent} from "../../../../shared/root/root.component";
import {Structure} from "../../structure";
import {CardStructure} from "../../card/card-structure";
import {ToastService} from "../../../../core/services/toast.service";
import {Router} from "@angular/router";
import {User} from "../user";
import {AppDate} from "../../../../shared/utils/app-date";

@Component({
  selector: 'app-card-attachment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimeModule
  ],
  templateUrl: './card-attachment-form.component.html',
  styleUrls: ['./card-attachment-form.component.scss', '../../../../shared/components/generic-form/generic-form.component.scss']
})
export class CardAttachmentFormComponent extends RootComponent implements OnInit {
  structure: Structure = CardStructure.instance;
  @Input() user!: User;
  entity: string = "";
  attributes: Attribute[] = [];
  form?: FormGroup;
  options: Map<string, any[]> = new Map<string, any[]>();
  protected fb: FormBuilder = inject(FormBuilder);
  protected translationService = inject(TranslationService);
  protected toastService = inject(ToastService)
  protected router = inject(Router);
  protected readonly AppUtils = AppUtils;
  protected cdr = inject(ChangeDetectorRef);
  formSubmitting: boolean = false;
  
  ngOnInit() {
    this.attributes = this.structure?.attributes || [];
    this.entity = this.structure?.entityName || "";
    this.initForm({});
    this.initOptions();
    this.setupValueChangeHandlers();
  }

  initOptions(): void {
    for (let attr of this.attributes) {
      if (!attr.isForeignKey() || attr.attr_name === 'user') continue;
      if (attr.inputField?._multiSelect) {
        this.getAll(attr.type, (data: any[]) => {
          this.setMultiSelectOptions(attr, data);
        });
        this.cdr.detectChanges();
      } else {
        this.getAll(attr.type, (data: any[]) => {
          this.options.set(attr.attr_name, data);
        });
        this.cdr.detectChanges();
      }
    }
    this.options.set('user', [this.user]);
    this.cdr.detectChanges();
  }

  initForm(formData: any): void {
    this.attributes = this.attributes.filter(attr => attr.type !== 'primaryKey');
    const formControls: { [key: string]: any } = this.attributes.reduce((controls, attr) => {
      // @ts-ignore
      controls[attr.attr_name] = [formData[attr.attr_name] || null, FormUtils.getInputValidators(attr)];
      return controls;
    }, {});
    this.form = this.fb.group(formControls);

    // Set the value of the dropdown after form is initialized
    const userControl = this.form.get('user');
    if (userControl) {
      userControl.setValue(this.user);
      userControl.disable();
    }
    this.form?.get('permanent')?.valueChanges.subscribe(value =>{
      let dateControl = this.form?.get('expirationDate')
      if(value){
        dateControl?.disable()
        dateControl?.setValue(AppDate.now().plusYears(100).toDate())
      }else{
        dateControl?.enable()
        dateControl?.setValue(undefined)
      }
    })
  }

  getEnumOptions(attr_name: string) {
    return FormUtils.getEnumOptions(attr_name, this.translationService);
  }

  public getPlaceholder(attr: Attribute): string {
    return this.translationService.translate(AppUtils.toFirstLetterLowercase(this.entity) + '.' + attr.attr_name).concat(" ", attr.inputField?._required ? '*' : '');
  }

  onSubmit(navigate = true, callback = () => {
  }): void {
    this.formSubmitting = true;
    if (this.form?.valid) {
      let body: {} = this.prepareForm(this.form);
      // @ts-ignore
      body['user'] = this.user;
      this.insert(body, this.entity, () => {
        this.toastService.showSuccess(this.translationService.translate("created_successfully"));
        this.form?.reset();
        this.formSubmitting = false;
        if (navigate)
          this.router.navigate(['/user']).then();
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

  protected prepareForm(form: FormGroup): { [key: string]: any; } {
    let body = form.value;
    this.form?.get('expirationDate')?.enable()
    for (let attr of this.attributes) {
      if (attr.type !== 'date') continue;
      const control = form.get(attr.attr_name);
      body[attr.attr_name] = AppDate.from(control?.value).toString();
    }
    this.form?.get('expirationDate')?.disable()
    return body;
  }

  private setupValueChangeHandlers(): void {
    this.attributes.forEach(attr => {
      const control = this.form?.controls[attr.attr_name];
      control?.valueChanges.subscribe(value => {
        if (value === '') {
          control.setValue(null, {emitEvent: false});
        }
      });
    });
  }

  private setMultiSelectOptions(attr: Attribute, data: any[]) {
    const treeNodes = FormUtils.convertDataToTreeNodes(data, attr, this.structure?.attributes || []);
    this.options.set(attr.attr_name, treeNodes);
  }
}
