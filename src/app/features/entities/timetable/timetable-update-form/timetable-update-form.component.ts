import {AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  GenericUpdateFormComponent
} from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {TimetableStructure} from "../timetable-structure";

@Component({
  selector: 'app-timetable-update-form',
  standalone: true,
  imports: [GenericUpdateFormComponent],
  templateUrl: './timetable-update-form.component.html',
  styleUrl: './timetable-update-form.component.css'
})

export class TimetableUpdateFormComponent implements AfterViewInit {
  @Input() structure!: TimetableStructure;
  @Input() id!: number;
  @ViewChild(GenericUpdateFormComponent) genericForm!: GenericUpdateFormComponent;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  ngAfterViewInit(): void {
    this.genericForm.disableControl('actionType');
  }
}
