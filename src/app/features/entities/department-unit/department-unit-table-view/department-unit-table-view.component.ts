import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";

@Component({
	selector: 'app-department-unit-table-view',
	standalone: true,
	imports: [GenericTableViewComponent],
	templateUrl: './department-unit-table-view.component.html',
	styleUrl: './department-unit-table-view.component.css'
})

export class DepartmentUnitTableViewComponent {
  @Input() structure?: Structure;
}
