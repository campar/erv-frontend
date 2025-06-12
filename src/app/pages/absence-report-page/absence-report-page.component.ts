import {Component} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {TranslatePipe} from "../../core/pipes/translate.pipe";
import {Page} from "../../core/entity-utils/page";
import {Attribute} from "../../core/entity-utils/attribute";
import {AbsenceReportStructure} from "./absence-report-structure";
import {RouterLink} from "@angular/router";
import {GenericTableViewComponent} from "../../shared/components/generic-table-view/generic-table-view.component";
import {
  AbsenceReportSearchFormComponent
} from "../../features/absence-report/absence-report-search-form/absence-report-search-form.component";
import {
  AbsenceReportTableViewComponent
} from "../../features/absence-report/absence-report-table-view/absence-report-table-view.component";
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
  selector: 'app-absence-report-page',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    TranslatePipe,
    RouterLink,
    GenericTableViewComponent,
    AbsenceReportSearchFormComponent,
    AbsenceReportTableViewComponent,
    IndividualReportTableViewComponent,
    BreadcrumbComponent,
    DailyReportSearchFormComponent,
    DailyReportTableViewComponent
  ],
  templateUrl: './absence-report-page.component.html',
  styleUrl: './absence-report-page.component.scss'
})
export class AbsenceReportPageComponent {
  structure: AbsenceReportStructure = AbsenceReportStructure.instance;
  public page?: Page;
  tableAttributes: Attribute[] = [
    new Attribute(
      'user',
      'User',
    ),
    new Attribute(
      'departmentUnit',
      'DepartmentUnit',
    ), new Attribute(
      'present',
      'boolean',
    )
  ];
}
