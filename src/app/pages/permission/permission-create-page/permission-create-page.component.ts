import { Component } from '@angular/core';
import { PermissionInsertFormComponent } from '../../../features/entities/permission/permission-insert-form/permission-insert-form.component';
import { PermissionStructure } from '../../../features/entities/permission/permission-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-permission-create-page',
	standalone: true,
  imports: [PermissionInsertFormComponent, BreadcrumbComponent],
	templateUrl: './permission-create-page.component.html',
	styleUrl: './permission-create-page.component.css'
})

export class PermissionCreatePageComponent {
	structure: PermissionStructure = PermissionStructure.instance;
}
