import { Component } from '@angular/core';
import { DepartmentUnitInsertFormComponent } from '../../../features/entities/department-unit/department-unit-insert-form/department-unit-insert-form.component';
import { DepartmentUnitStructure } from '../../../features/entities/department-unit/department-unit-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserInsertFormComponent} from "../../../features/entities/user/user-insert-form/user-insert-form.component";

@Component({
	selector: 'app-department-unit-create-page',
	standalone: true,
    imports: [DepartmentUnitInsertFormComponent, BreadcrumbComponent, UserInsertFormComponent],
	templateUrl: './department-unit-create-page.component.html',
	styleUrl: './department-unit-create-page.component.css'
})

export class DepartmentUnitCreatePageComponent {
	structure: DepartmentUnitStructure = DepartmentUnitStructure.instance;
}
