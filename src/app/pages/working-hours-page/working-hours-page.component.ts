import {Component} from '@angular/core';
import {Page} from "../../core/entity-utils/page";
import {Attribute} from "../../core/entity-utils/attribute";

import {RouterLink} from "@angular/router";
import {
  WorkingHoursReportSearchFormComponent
} from "../../features/working-hours-report/working-hours-report-search-form/working-hours-report-search-form.component";
import {
  WorkingHoursReportTableViewComponent
} from "../../features/working-hours-report/working-hours-report-table-view/working-hours-report-table-view.component";
import {WorkingHoursReportStructure} from "./working-hours-report-structure";
import {
  IndividualReportTableViewComponent
} from "../../features/individual-report/individual-report-table-view/individual-report-table-view.component";
import {BreadcrumbComponent} from "../../shared/components/breadcrumb/breadcrumb.component";
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";

@Component({
  selector: 'app-working-hours-page',
  standalone: true,
  imports: [RouterLink, WorkingHoursReportSearchFormComponent, WorkingHoursReportTableViewComponent, IndividualReportTableViewComponent, BreadcrumbComponent, DailyReportSearchFormComponent, DailyReportTableViewComponent],
  templateUrl: './working-hours-page.component.html',
  styleUrl: './working-hours-page.component.scss'
})
export class WorkingHoursPageComponent {
  structure: WorkingHoursReportStructure = WorkingHoursReportStructure.instance;
  public page?: Page;
  tableAttributes: Attribute[] = [
    new Attribute(
      'user',
      'User'
    ),
    new Attribute(
      'total',
      'string'
    )
  ];
}
