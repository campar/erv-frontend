import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PrimeModule} from '../../../../shared/prime/prime.modules';

@Component({
  selector: 'app-timetable-table-view',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, DatePipe, GenericTableViewComponent, PrimeModule],
  templateUrl: './timetable-table-view.component.html',
  styleUrl: './timetable-table-view.component.css'
})

export class TimetableTableViewComponent {
  @Input() structure?: Structure;
}
