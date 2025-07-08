import {Component} from '@angular/core';
import {Page} from "../../core/entity-utils/page";
import {Attribute} from "../../core/entity-utils/attribute";
import {LeavingArrivalReportStructure} from "./leaving-arrival-report-structure";
import {RouterLink} from "@angular/router";
import {
  LeavingArrivalReportSearchFormComponent
} from "../../features/leaving-arrival-report/leaving-arrival-report-search-form/leaving-arrival-report-search-form.component";
import {
  LeavingArrivalReportTableViewComponent
} from "../../features/leaving-arrival-report/leaving-arrival-report-table-view/leaving-arrival-report-table-view.component";
import {BreadcrumbComponent} from "../../shared/components/breadcrumb/breadcrumb.component";
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";

@Component({
  selector: 'app-leaving-arrival-page',
  standalone: true,
  imports: [RouterLink, LeavingArrivalReportSearchFormComponent, LeavingArrivalReportTableViewComponent, BreadcrumbComponent, DailyReportSearchFormComponent, DailyReportTableViewComponent],
  templateUrl: './leaving-arrival-page.component.html',
  styleUrl: './leaving-arrival-page.component.scss'
})
export class LeavingArrivalPageComponent {
  structure: LeavingArrivalReportStructure = LeavingArrivalReportStructure.instance;
  public page?: Page;

  tableAttributes: Attribute[] = [
    new Attribute(
      'user',
      'User'
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit'
    ), new Attribute(
      'shifts',
      '[]'
    ),
    new Attribute(
      'faultsCount',
      'number'
    ),
    new Attribute(
      'timetable',
      '{}'
    )
  ];
}
