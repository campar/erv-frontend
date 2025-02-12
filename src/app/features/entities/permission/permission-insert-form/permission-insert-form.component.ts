import { Component } from '@angular/core';
import { GenericInsertFormComponent } from "../../../../shared/components/generic-insert-form/generic-insert-form.component";

@Component({
	selector: 'app-permission-insert-form',
	standalone: true,
	imports: [GenericInsertFormComponent],
	templateUrl: './permission-insert-form.component.html',
	styleUrl: './permission-insert-form.component.css'
})

export class PermissionInsertFormComponent extends GenericInsertFormComponent {
}
