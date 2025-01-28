import { Component } from '@angular/core';
import { GenericInsertFormComponent } from "../../../../shared/components/generic-insert-form/generic-insert-form.component";

@Component({
	selector: 'app-role-insert-form',
	standalone: true,
	imports: [GenericInsertFormComponent],
	templateUrl: './role-insert-form.component.html',
	styleUrl: './role-insert-form.component.css'
})

export class RoleInsertFormComponent extends GenericInsertFormComponent {
}
