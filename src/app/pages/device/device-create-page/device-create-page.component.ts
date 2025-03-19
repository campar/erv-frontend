import { Component } from '@angular/core';
import { DeviceInsertFormComponent } from '../../../features/entities/device/device-insert-form/device-insert-form.component';
import { DeviceStructure } from '../../../features/entities/device/device-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-device-create-page',
	standalone: true,
  imports: [DeviceInsertFormComponent, BreadcrumbComponent],
	templateUrl: './device-create-page.component.html',
	styleUrl: './device-create-page.component.css'
})

export class DeviceCreatePageComponent {
	structure: DeviceStructure = DeviceStructure.instance;
}
