import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";

@Component({
	selector: 'app-shift-table-view',
	standalone: true,
	imports: [GenericTableViewComponent],
	templateUrl: './shift-table-view.component.html',
	styleUrl: './shift-table-view.component.css'
})

export class ShiftTableViewComponent {
  @Input() structure?: Structure;
}
