import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { LocationUpdateFormComponent } from '../../../features/entities/location/location-update-form/location-update-form.component';
import { LocationStructure } from '../../../features/entities/location/location-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-location-edit-page',
	standalone: true,
    imports: [LocationUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './location-edit-page.component.html',
	styleUrl: './location-edit-page.component.css'
})

export class LocationEditPageComponent implements OnInit {
	structure: LocationStructure = LocationStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
