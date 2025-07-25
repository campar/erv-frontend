import { Component, inject } from '@angular/core';
import { Page } from "../../core/entity-utils/page";
import { Attribute } from "../../core/entity-utils/attribute";
import { CheckInStatsReportStructure } from "./check-in-stats-report-structure";
import {
  CheckInStatsReportTableViewComponent
} from "../../features/check-in-stats-report/check-in-stats-report-table-view/check-in-stats-report-table-view.component";
import {
  CheckInStatsReportSearchFormComponent
} from "../../features/check-in-stats-report/check-in-stats-report-search-form/check-in-stats-report-search-form.component";
import { RouterLink } from "@angular/router";
import { ChartData, ChartProperties, SeriesData } from '../../shared/components/chart/chart-data.model';
import { ChartType } from '../../shared/components/chart/chart-type.enum';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section/section.component';
import {
  IndividualReportTableViewComponent
} from "../../features/individual-report/individual-report-table-view/individual-report-table-view.component";
import { TranslationService } from "../../core/services/translation.service";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import {
  DailyReportSearchFormComponent
} from "../../features/daily-report/daily-report-search-form/daily-report-search-form.component";
import {
  DailyReportTableViewComponent
} from "../../features/daily-report/daily-report-table-view/daily-report-table-view.component";
import { PanelModule } from 'primeng/panel';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-check-in-stats-page',
  standalone: true,
  imports: [CheckInStatsReportTableViewComponent, CheckInStatsReportSearchFormComponent, RouterLink, ChartComponent, CommonModule, SectionComponent, IndividualReportTableViewComponent, BreadcrumbComponent, DailyReportSearchFormComponent, DailyReportTableViewComponent, PanelModule],
  templateUrl: './check-in-stats-page.component.html',
  styleUrl: './check-in-stats-page.component.scss'
})

export class CheckInStatsPageComponent {
  translationService = inject(TranslationService);
  searchService = inject(SearchService);
  structure: CheckInStatsReportStructure = CheckInStatsReportStructure.instance;
  public page?: Page;
  chartType: ChartType = ChartType.BarVertical;
  chartProperties: ChartProperties = new ChartProperties(this.translationService.translate("device_on_location"), this.translationService.translate("actionCount"));
  chartData: ChartData[] = []

  tableAttributes: Attribute[] = [
    new Attribute(
      'device',
      '{}'
    ),
    new Attribute(
      'checking',
      '{}'
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

  onTableDataChange(data: any[]) {
    this.dataSize = data.length
    console.log(data.length)
    this.chartData = [];
    this.chartData = [
      new ChartData(
        this.translationService.translate("actionCount"),
        data.map(item => {
          return new SeriesData(
            item.device.code + " " + item.device.location.city + " " + item.device.location.address,
            item.total,
          );
        })
      )
    ];
  }
}
