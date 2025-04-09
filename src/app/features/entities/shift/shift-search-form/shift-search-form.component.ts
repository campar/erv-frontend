import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { ShiftStructure } from '../shift-structure';

@Component({
	selector: 'app-shift-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './shift-search-form.component.html',
	styleUrl: './shift-search-form.component.css'
})

export class ShiftSearchFormComponent {
	@Input() structure!: ShiftStructure;
}
