import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { RoleStructure } from '../role-structure';

@Component({
	selector: 'app-role-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './role-search-form.component.html',
	styleUrl: './role-search-form.component.css'
})

export class RoleSearchFormComponent {
	@Input() structure!: RoleStructure;
}
