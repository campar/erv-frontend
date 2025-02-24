import { Component } from '@angular/core';
import { GenericUpdateFormComponent } from "../../../../shared/components/generic-update-form/generic-update-form.component";

@Component({
	selector: 'app-location-update-form',
	standalone: true,
	imports: [GenericUpdateFormComponent],
	templateUrl: './location-update-form.component.html',
	styleUrl: './location-update-form.component.css'
})

export class LocationUpdateFormComponent extends GenericUpdateFormComponent {
}
