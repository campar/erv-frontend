import { Component } from '@angular/core';
import { GenericUpdateFormComponent } from "../../../../shared/components/generic-update-form/generic-update-form.component";

@Component({
	selector: 'app-permission-update-form',
	standalone: true,
	imports: [GenericUpdateFormComponent],
	templateUrl: './permission-update-form.component.html',
	styleUrl: './permission-update-form.component.css'
})

export class PermissionUpdateFormComponent extends GenericUpdateFormComponent {
}
