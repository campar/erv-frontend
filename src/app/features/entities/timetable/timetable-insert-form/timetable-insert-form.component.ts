import {Component, Input} from '@angular/core';
import {
  GenericInsertFormComponent
} from "../../../../shared/components/generic-insert-form/generic-insert-form.component";
import {TimetableStructure} from "../timetable-structure";

@Component({
  selector: 'app-timetable-insert-form',
  standalone: true,
  imports: [GenericInsertFormComponent],
  templateUrl: './timetable-insert-form.component.html',
  styleUrl: './timetable-insert-form.component.css'
})

export class TimetableInsertFormComponent {
  @Input() structure!: TimetableStructure;
}
