import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DepartmentUnitUpdateFormComponent } from '../../../features/entities/department-unit/department-unit-update-form/department-unit-update-form.component';
import { DepartmentUnitStructure } from '../../../features/entities/department-unit/department-unit-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-department-unit-edit-page',
	standalone: true,
    imports: [DepartmentUnitUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './department-unit-edit-page.component.html',
	styleUrl: './department-unit-edit-page.component.css'
})

export class DepartmentUnitEditPageComponent implements OnInit {
	structure: DepartmentUnitStructure = DepartmentUnitStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
