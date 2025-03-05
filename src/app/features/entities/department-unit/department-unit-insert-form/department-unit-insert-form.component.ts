import { Component } from '@angular/core';
import { GenericInsertFormComponent } from "../../../../shared/components/generic-insert-form/generic-insert-form.component";

@Component({
	selector: 'app-department-unit-insert-form',
	standalone: true,
	imports: [GenericInsertFormComponent],
	templateUrl: './department-unit-insert-form.component.html',
	styleUrl: './department-unit-insert-form.component.css'
})

export class DepartmentUnitInsertFormComponent extends GenericInsertFormComponent {
}
