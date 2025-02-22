import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { LocationStructure } from '../location-structure';

@Component({
	selector: 'app-location-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './location-search-form.component.html',
	styleUrl: './location-search-form.component.css'
})

export class LocationSearchFormComponent {
	@Input() structure!: LocationStructure;
}
