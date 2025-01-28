import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { RoleUpdateFormComponent } from '../../../features/entities/role/role-update-form/role-update-form.component';
import { RoleStructure } from '../../../features/entities/role/role-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-role-edit-page',
	standalone: true,
    imports: [RoleUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './role-edit-page.component.html',
	styleUrl: './role-edit-page.component.css'
})

export class RoleEditPageComponent implements OnInit {
	structure: RoleStructure = RoleStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
