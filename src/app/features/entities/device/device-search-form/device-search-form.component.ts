import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { DeviceStructure } from '../device-structure';

@Component({
	selector: 'app-device-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './device-search-form.component.html',
	styleUrl: './device-search-form.component.css'
})

export class DeviceSearchFormComponent {
	@Input() structure!: DeviceStructure;
}
