import { Component } from '@angular/core';
import { GenericUpdateFormComponent } from "../../../../shared/components/generic-update-form/generic-update-form.component";

@Component({
	selector: 'app-device-update-form',
	standalone: true,
	imports: [GenericUpdateFormComponent],
	templateUrl: './device-update-form.component.html',
	styleUrl: './device-update-form.component.css'
})

export class DeviceUpdateFormComponent extends GenericUpdateFormComponent {
}
