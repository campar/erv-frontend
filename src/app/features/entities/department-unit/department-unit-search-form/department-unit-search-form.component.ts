import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { DepartmentUnitStructure } from '../department-unit-structure';

@Component({
	selector: 'app-department-unit-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './department-unit-search-form.component.html',
	styleUrl: './department-unit-search-form.component.css'
})

export class DepartmentUnitSearchFormComponent {
	@Input() structure!: DepartmentUnitStructure;
}
