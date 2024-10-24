import {Directive} from '@angular/core';
import {Calendar} from "primeng/calendar";

@Directive({
  selector: 'p-calendar',
})
export class CalendarDateFormatDirective {
  constructor(private calendar: Calendar) {
    this.calendar.dateFormat = 'dd/mm/yy';
    this.calendar.hourFormat = 'HH:mm';
  }

}
