import { Component, inject } from '@angular/core';
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import { GenericTableViewComponent } from "../../shared/components/generic-table-view/generic-table-view.component";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../core/pipes/translate.pipe";
import { Page } from "../../core/entity-utils/page";
import { SearchService } from "../../core/services/search.service";
import { Attribute } from "../../core/entity-utils/attribute";
import { IndividualReportStructure } from "./individual-report-structure";
import {
  IndividualReportSearchFormComponent
} from "../../features/individual-report/individual-report-search-form/individual-report-search-form.component";
import {
  IndividualReportTableViewComponent
} from "../../features/individual-report/individual-report-table-view/individual-report-table-view.component";
import { ChartType } from '../../shared/components/chart/chart-type.enum';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { ChartData, ChartProperties, SeriesData } from '../../shared/components/chart/chart-data.model';
import { CommonModule, formatDate } from '@angular/common';
import { SectionComponent } from '../../shared/components/section/section.component';
import { TranslationService } from "../../core/services/translation.service";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";
import { FieldsetModule } from "primeng/fieldset";
import { PanelModule } from "primeng/panel";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-individual-report-page',
  standalone: true,
  imports: [
    DailyReportSearchFormComponent,
    GenericTableViewComponent,

    RouterLink,
    TranslatePipe,
    IndividualReportSearchFormComponent,
    IndividualReportTableViewComponent,
    ChartComponent,
    CommonModule,
    SectionComponent,
    BreadcrumbComponent,
    DailyReportTableViewComponent,
    FieldsetModule,
    PanelModule
  ],
  templateUrl: './individual-report-page.component.html',
  styleUrl: './individual-report-page.component.scss'
})
export class IndividualReportPageComponent {
  structure: IndividualReportStructure = IndividualReportStructure.instance;
  public page?: Page;
  searchService = inject(SearchService);
  translationService = inject(TranslationService);
  chartType: ChartType = ChartType.Area;
  chartProperties: ChartProperties = new ChartProperties(this.translationService.translate("date"), this.translationService.translate("time_spent"));
  chartData: ChartData[] = []

  tableAttributes: Attribute[] = [
    new Attribute(
      'date',
      'date'
    ),
    new Attribute(
      'timetableInfo',
      '[]'
    ), new Attribute(
      'timeSpent',
      'string'
    )
  ];
  
  dataSize: number = 0;
  protected subs: Subscription[] = [];

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.performSubscription(this.searchService.clearEvent$, () => {
      this.dataSize = 0
    });
  }

  performSubscription(sub: Observable<any>, res: any) {
    let s = sub.subscribe((data: any) => {
      res(data);
    })
    this.subs.push(s);
  }

  onTableDataChange(data: any) {
    this.dataSize = data.data.length;
    this.chartData = [];
    data = this.transformData(data)
    this.chartData = [
      new ChartData(
        this.translationService.translate("time_spent"),
        data.map((item: { timeSpent: number; date: string; }) => {
          return new SeriesData(
            item.date,
            item.timeSpent,
          );
        })
      )
    ];
  }


  private transformData(data: any) {
    const transformedData: { date: string; timeSpent: number; }[] = [];
    const dates: string[] = [];
    const existingDates = data.data.map((item: { date: any; timeSpent: number; }) => {

      dates.push(item.date)

      return {
        date: formatDate(item.date, "dd.MM.yyyy", "en"),
        timeSpent: item.timeSpent
      }
    });
    const minDate = new Date(Math.min(...dates.map(date => new Date(date).getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => new Date(date).getTime())));

    const allDates = this.generateDateRange(minDate, maxDate);
    allDates.forEach(date => {
      const existingEntry = existingDates.find((item: { date: string; }) => item.date === date);
      if (existingEntry) {
        transformedData.push({
          date: existingEntry.date,
          timeSpent: this.convertTimeSpentToHours(existingEntry.timeSpent),
        });
      } else {
        transformedData.push({
          date: date,
          timeSpent: 0,
        });
      }
    });
    return transformedData;
  }

  private generateDateRange(dateFrom: Date, dateTo: Date): string[] {
    const dates = [];
    let currentDate = dateFrom;
    while (currentDate <= dateTo) {
      dates.push(formatDate(currentDate, "dd.MM.yyyy", "en"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  private convertTimeSpentToHours(timeSpent: string): number {
    if (timeSpent === "0" || timeSpent === "-") return 0;
    else {
      const parts = timeSpent.split(':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return hours + minutes / 60 + seconds / 3600;
    }
  }

}
