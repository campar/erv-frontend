import { Component } from '@angular/core';
import { GenericInsertFormComponent } from "../../../../shared/components/generic-insert-form/generic-insert-form.component";

@Component({
	selector: 'app-device-insert-form',
	standalone: true,
	imports: [GenericInsertFormComponent],
	templateUrl: './device-insert-form.component.html',
	styleUrl: './device-insert-form.component.css'
})

export class DeviceInsertFormComponent extends GenericInsertFormComponent {
}
