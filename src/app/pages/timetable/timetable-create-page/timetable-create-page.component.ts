import { Component } from '@angular/core';
import { TimetableInsertFormComponent } from '../../../features/entities/timetable/timetable-insert-form/timetable-insert-form.component';
import { TimetableStructure } from '../../../features/entities/timetable/timetable-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-timetable-create-page',
	standalone: true,
  imports: [TimetableInsertFormComponent, BreadcrumbComponent],
	templateUrl: './timetable-create-page.component.html',
	styleUrl: './timetable-create-page.component.css'
})

export class TimetableCreatePageComponent {
	structure: TimetableStructure = TimetableStructure.instance;
}
