import { Component } from '@angular/core';
import { ShiftInsertFormComponent } from '../../../features/entities/shift/shift-insert-form/shift-insert-form.component';
import { ShiftStructure } from '../../../features/entities/shift/shift-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-shift-create-page',
	standalone: true,
  imports: [ShiftInsertFormComponent, BreadcrumbComponent],
	templateUrl: './shift-create-page.component.html',
	styleUrl: './shift-create-page.component.css'
})

export class ShiftCreatePageComponent {
	structure: ShiftStructure = ShiftStructure.instance;
}
