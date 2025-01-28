import { Component } from '@angular/core';
import { RoleInsertFormComponent } from '../../../features/entities/role/role-insert-form/role-insert-form.component';
import { RoleStructure } from '../../../features/entities/role/role-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-role-create-page',
	standalone: true,
  imports: [RoleInsertFormComponent, BreadcrumbComponent],
	templateUrl: './role-create-page.component.html',
	styleUrl: './role-create-page.component.css'
})

export class RoleCreatePageComponent {
	structure: RoleStructure = RoleStructure.instance;
}
