import { Component } from '@angular/core';
import { GenericInsertFormComponent } from "../../../../shared/components/generic-insert-form/generic-insert-form.component";

@Component({
	selector: 'app-location-insert-form',
	standalone: true,
	imports: [GenericInsertFormComponent],
	templateUrl: './location-insert-form.component.html',
	styleUrl: './location-insert-form.component.css'
})

export class LocationInsertFormComponent extends GenericInsertFormComponent {
}
