import { Component } from '@angular/core';
import { LocationInsertFormComponent } from '../../../features/entities/location/location-insert-form/location-insert-form.component';
import { LocationStructure } from '../../../features/entities/location/location-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-location-create-page',
	standalone: true,
  imports: [LocationInsertFormComponent, BreadcrumbComponent],
	templateUrl: './location-create-page.component.html',
	styleUrl: './location-create-page.component.css'
})

export class LocationCreatePageComponent {
	structure: LocationStructure = LocationStructure.instance;
}
