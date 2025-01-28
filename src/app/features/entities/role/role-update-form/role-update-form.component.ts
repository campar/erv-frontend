import {Component, Input} from '@angular/core';
import { GenericUpdateFormComponent } from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {RoleStructure} from "../role-structure";

@Component({
	selector: 'app-role-update-form',
	standalone: true,
	imports: [GenericUpdateFormComponent],
	templateUrl: './role-update-form.component.html',
	styleUrl: './role-update-form.component.css'
})

export class RoleUpdateFormComponent {
  @Input() structure!: RoleStructure;
  @Input() id!: number;
}
