import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { TimetableUpdateFormComponent } from '../../../features/entities/timetable/timetable-update-form/timetable-update-form.component';
import { TimetableStructure } from '../../../features/entities/timetable/timetable-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-timetable-edit-page',
	standalone: true,
  imports: [TimetableUpdateFormComponent, BreadcrumbComponent],
	templateUrl: './timetable-edit-page.component.html',
	styleUrl: './timetable-edit-page.component.css'
})

export class TimetableEditPageComponent implements OnInit {
	structure: TimetableStructure = TimetableStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
