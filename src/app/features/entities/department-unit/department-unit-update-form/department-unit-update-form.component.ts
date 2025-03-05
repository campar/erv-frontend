import {Component} from '@angular/core';
import {
  GenericUpdateFormComponent
} from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {FormUtils} from "../../../../shared/utils/form-utils";
import {AppUtils} from "../../../../shared/utils/app-utils";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-department-unit-update-form',
  standalone: true,
  imports: [GenericUpdateFormComponent, PrimeModule, ReactiveFormsModule],
  templateUrl: 'department-unit-update-form.component.html',
  styleUrls: ['./department-unit-update-form.component.css', '../../../../shared/components/generic-form/generic-form.component.scss']
})

export class DepartmentUnitUpdateFormComponent extends GenericUpdateFormComponent {
  protected override populateFormData(object: { [p: string]: any }): { [p: string]: any } {
    this.handleDates(object);
    for (let attr of this.attributes) {
      if (!attr.isForeignKey()) continue;
      if (attr.inputField?.isTreeSelect()) {
        let selectedItem = {
          label: AppUtils.getDisplayValue(object[attr.attr_name], attr.type),
          data: object[attr.attr_name],
        }
        object[attr.attr_name] = selectedItem.label && selectedItem.data ? selectedItem : null;
        this.getAll(attr.type, (all: any[]) => {
          let treeNodes = FormUtils.convertDataToTreeNodes(all, attr, this.structure?.attributes || []);
          // filter tree nodes that can't be selectable (self and children)
          let filtered = FormUtils.filterTreeNodes(treeNodes, data => data.code !== object['code']);
          this.options.set(attr.attr_name, filtered);
        });
      } else {
        this.getAll(attr.type, (data: any[]) => {
          this.options.set(attr.attr_name, data);
        });
      }
    }
    return object;
  }
}
