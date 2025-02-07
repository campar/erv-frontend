import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { PermissionStructure } from '../permission-structure';

@Component({
	selector: 'app-permission-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './permission-search-form.component.html',
	styleUrl: './permission-search-form.component.css'
})

export class PermissionSearchFormComponent {
	@Input() structure!: PermissionStructure;
}
