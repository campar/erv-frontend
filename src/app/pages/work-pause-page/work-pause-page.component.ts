import { Component, inject } from '@angular/core';
import {
  IndividualReportSearchFormComponent
} from "../../features/individual-report/individual-report-search-form/individual-report-search-form.component";
import {
  IndividualReportTableViewComponent
} from "../../features/individual-report/individual-report-table-view/individual-report-table-view.component";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../core/pipes/translate.pipe";

import { Page } from "../../core/entity-utils/page";
import { SearchService } from "../../core/services/search.service";
import { Attribute } from "../../core/entity-utils/attribute";
import { PauseReportStructure } from "./pause-report-structure";
import {
  PauseReportSearchFormComponent
} from "../../features/pause-report/pause-report-search-form/pause-report-search-form.component";
import {
  PauseReportTableViewComponent
} from "../../features/pause-report/pause-report-table-view/pause-report-table-view.component";
import { ChartData, ChartProperties, SeriesData } from '../../shared/components/chart/chart-data.model';
import { ChartType } from '../../shared/components/chart/chart-type.enum';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { CommonModule, formatDate } from '@angular/common';
import { SectionComponent } from '../../shared/components/section/section.component';
import { TranslationService } from "../../core/services/translation.service";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";
import { PanelModule } from "primeng/panel";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-work-pause-page',
  standalone: true,
  imports: [
    IndividualReportSearchFormComponent,
    IndividualReportTableViewComponent,

    RouterLink,
    TranslatePipe,
    PauseReportSearchFormComponent,
    PauseReportTableViewComponent,
    ChartComponent,
    CommonModule,
    SectionComponent,
    BreadcrumbComponent,
    DailyReportSearchFormComponent,
    DailyReportTableViewComponent,
    PanelModule
  ],
  templateUrl: './work-pause-page.component.html',
  styleUrl: './work-pause-page.component.scss'
})
export class WorkPausePageComponent {
  translationService = inject(TranslationService);
  structure: PauseReportStructure = PauseReportStructure.instance;
  public page?: Page;
  searchService: SearchService = inject(SearchService);
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
      'duration',
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
    this.dataSize = data.data.length
    this.chartData = [];
    data = this.transformData(data)
    this.chartData = [
      new ChartData(
        this.translationService.translate("time_spent"),
        data.map((item: { duration: number; date: string; }) => {
          return new SeriesData(
            item.date,
            item.duration,
          );
        })
      )
    ];
  }

  private transformData(data: any) {
    const transformedData: { date: string; duration: number; }[] = [];
    const dates: string[] = [];
    const existingDates = data.data.map((item: { date: any; duration: number; }) => {
      dates.push(item.date)
      return {
        date: formatDate(item.date, "dd.MM.yyyy", "en"),
        duration: item.duration
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
          duration: this.convertDurationToHours(existingEntry.duration),
        });
      } else {
        transformedData.push({
          date: date,
          duration: 0,
        });
      }
    });
    return transformedData;
  }

  private generateDateRange(dateFrom: Date, dateTo: Date): string[] {
    const dates = [];
    let currentDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    while (currentDate <= endDate) {
      dates.push(formatDate(currentDate, "dd.MM.yyyy", "en"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }


  private convertDurationToHours(duration: string): number {
    if (duration === "0" || duration === "-") return 0;
    else {
      const parts = duration.split(':');
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return minutes + seconds / 60;
    }
  }
}
