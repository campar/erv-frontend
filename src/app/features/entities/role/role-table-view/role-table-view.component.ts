import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";

@Component({
	selector: 'app-role-table-view',
	standalone: true,
	imports: [GenericTableViewComponent],
	templateUrl: './role-table-view.component.html',
	styleUrl: './role-table-view.component.css'
})

export class RoleTableViewComponent extends GenericTableViewComponent{
//   @Input() structure?: Structure;
}
