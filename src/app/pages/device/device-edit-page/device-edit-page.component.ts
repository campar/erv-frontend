import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DeviceUpdateFormComponent } from '../../../features/entities/device/device-update-form/device-update-form.component';
import { DeviceStructure } from '../../../features/entities/device/device-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-device-edit-page',
	standalone: true,
  imports: [DeviceUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './device-edit-page.component.html',
	styleUrl: './device-edit-page.component.css'
})

export class DeviceEditPageComponent implements OnInit {
	structure: DeviceStructure = DeviceStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
