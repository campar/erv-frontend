import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";

@Component({
	selector: 'app-location-table-view',
	standalone: true,
	imports: [GenericTableViewComponent],
	templateUrl: './location-table-view.component.html',
	styleUrl: './location-table-view.component.css'
})

export class LocationTableViewComponent {
  @Input() structure?: Structure;
}
