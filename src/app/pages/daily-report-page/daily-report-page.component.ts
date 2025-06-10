import {Component, inject} from '@angular/core';
import {
  DepartmentUnitSearchFormComponent
} from "../../features/entities/department-unit/department-unit-search-form/department-unit-search-form.component";
import {
  DepartmentUnitTableViewComponent
} from "../../features/entities/department-unit/department-unit-table-view/department-unit-table-view.component";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "../../core/pipes/translate.pipe";
import {Page} from "../../core/entity-utils/page";
import {SearchService} from "../../core/services/search.service";
import {GenericTableViewComponent} from "../../shared/components/generic-table-view/generic-table-view.component";
import {DailyReportStructure} from "./daily-report-structure";
import {Attribute} from "../../core/entity-utils/attribute";
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";
import {BreadcrumbComponent} from "../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {CardSearchFormComponent} from "../../features/entities/card/card-search-form/card-search-form.component";
import {CardTableViewComponent} from "../../features/entities/card/card-table-view/card-table-view.component";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-daily-report-page',
  standalone: true,
  imports: [
    DepartmentUnitSearchFormComponent,
    DepartmentUnitTableViewComponent,
    RouterLink,
    TranslatePipe,
    GenericTableViewComponent,
    DailyReportSearchFormComponent,
    DailyReportTableViewComponent,
    BreadcrumbComponent,
    Button,
    CardSearchFormComponent,
    CardTableViewComponent,
    MenuModule
  ],
  templateUrl: './daily-report-page.component.html',
  styleUrls: ['./daily-report-page.component.scss']
})
export class DailyReportPageComponent {
  structure: DailyReportStructure = DailyReportStructure.instance;
  public page?: Page;
  searchService: SearchService = inject(SearchService);

  tableAttributes: Attribute[] = [
    new Attribute(
      'user',
      '{}',
    ),
    new Attribute(
      'timetables',
      '[]',
    ),
    new Attribute(
      'timeSpent',
      'string',
    ),
    new Attribute(
      'overtime',
      'string'
    ),
  ];
}
