import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ShiftUpdateFormComponent } from '../../../features/entities/shift/shift-update-form/shift-update-form.component';
import { ShiftStructure } from '../../../features/entities/shift/shift-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-shift-edit-page',
	standalone: true,
  imports: [ShiftUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './shift-edit-page.component.html',
	styleUrl: './shift-edit-page.component.css'
})

export class ShiftEditPageComponent implements OnInit {
	structure: ShiftStructure = ShiftStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
