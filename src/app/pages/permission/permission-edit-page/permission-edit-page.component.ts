import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { PermissionUpdateFormComponent } from '../../../features/entities/permission/permission-update-form/permission-update-form.component';
import { PermissionStructure } from '../../../features/entities/permission/permission-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-permission-edit-page',
	standalone: true,
    imports: [PermissionUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './permission-edit-page.component.html',
	styleUrl: './permission-edit-page.component.css'
})

export class PermissionEditPageComponent implements OnInit {
	structure: PermissionStructure = PermissionStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
