import {Component} from '@angular/core';
import {
  GenericUpdateFormComponent
} from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {PickListModule} from "primeng/picklist";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "../../../../core/pipes/translate.pipe";
import {TreeSelectModule} from "primeng/treeselect";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {FormUtils} from "../../../../shared/utils/form-utils";
import {durationValidator, timeRangeValidator} from "../shift.validators";
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-shift-update-form',
  standalone: true,
  imports: [ButtonDirective, CalendarModule, DropdownModule, FloatLabelModule, InputTextModule, MultiSelectModule, NgForOf, NgIf, PickListModule, PrimeModule, PrimeTemplate, ReactiveFormsModule, TranslatePipe, TreeSelectModule, TriStateCheckboxModule],
  templateUrl: './shift-update-form.component.html',
  styleUrl: './shift-update-form.component.css'
})

export class ShiftUpdateFormComponent extends GenericUpdateFormComponent {
  override initForm(formData: any) {
    const formControls: { [key: string]: any } = this.attributes.reduce((controls, attr) => {
      // @ts-ignore
      controls[attr.attr_name] = [formData[attr.attr_name] || null, FormUtils.getInputValidators(attr)];
      return controls;
    }, {});
    this.form = this.fb.group(formControls, {validators: [timeRangeValidator, durationValidator]});
    
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
                control.setValue(formattedValue, {emitEvent: false});
              }
            });
          }
        });
  }
}
