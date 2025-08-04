import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {PrimeModule} from '../../prime/prime.modules';
import {Router} from '@angular/router';
import {TimetableService} from '../../../features/services/timetable.service';
import {RootComponent} from '../../root/root.component';
import {Page} from '../../../core/entity-utils/page';
import {SearchDTO} from '../../../core/entity-utils/search-dto';
import {ChartComponent} from "../chart/chart.component";
import {ChartData, ChartProperties, SeriesData} from '../chart/chart-data.model';
import {TranslationService} from '../../../core/services/translation.service';
import {ChartType} from '../chart/chart-type.enum';
import {QueryService} from "../../../core/services/query.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PrimeModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends RootComponent implements OnInit {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  page?: Page;
  data?: any;
  chartData?: any;
  pressenceChartData?: any;
  dataSource: any[] = [];
  loading: boolean = false;
  first = 0;
  totalRecords = 0;
  rows = (this.page?.size ? this.page?.size : 5);
  pageSize: number = 5;
  timetableService = inject(TimetableService);
  translationService = inject(TranslationService);
  queryService = inject(QueryService);
  chartProperties: ChartProperties = new ChartProperties(this.translationService.translate("date"), this.translationService.translate("time_spent"));
  chartType: ChartType = ChartType.PieGrid;
  pressenceChartType: ChartType = ChartType.Area;
  router = inject(Router)
  pressenceChartProperties: ChartProperties = new ChartProperties(this.translationService.translate("time"), this.translationService.translate("number_of_checkins"));


  ngOnInit(): void {
    this.getData(0, false)
  }

  getData(pageNumber: number, pageChange: boolean) {
    this.performSubscription(this.timetableService.getDashboardData({
      pageNumber: pageNumber,
      pageSize: 5
    }), (data: any) => {
      this.data = data;
      this.page = data.presentUsers;
      this.rows = (this.page?.size ? this.page?.size : 10);
      this.totalRecords = this.page?.totalElements ? this.page?.totalElements : 0
      this.dataSource = this.page ? this.page.content : [];
      if(!pageChange){
        this.chartData = Object.entries(data.actionCount).map(([name, value]) => ({
          name: this.translationService.translate(name.replace(/([A-Z])/g, '_$1').trim().toLowerCase()),
          value
        }));
        this.pressenceChartData = [this.transformData(this.fillMissingIntervals(this.data.arrivalCount,1),'employee_checkins'), this.transformData(this.fillMissingIntervals(this.data.leaveCount,1),'employee_checkouts')];
        // this.pressenceChartData = this.transformData(this.data.arrivalCount);
      }
    });
  }

  onPageChange(event: any): void {
    this.first = event.first
    this.getData(this.first / this.pageSize, true)
  }

  tableChangeSearch(dto: SearchDTO) {
    this.loading = true;
    this.timetableService.getDashboardData(dto);
  }

  protected updateData(data: Page | undefined) {
    this.page = data;
    this.dataSource = this.page ? [...this.page.content] : [];
    this.first = this.page?.number ? this.page.size * this.page.number : 0;
    this.totalRecords = this.page?.totalElements ?? 0;
    this.loading = false;
    this.cdr.detectChanges();
  }
  transformData(arrivalCount: { intervalStart: string, checkinCount: number }[], groupName: string): ChartData {
    const series = arrivalCount.map(item => {
      const time= new Date(item.intervalStart);
      return new SeriesData(time, item.checkinCount);
    });

    return new ChartData(this.translationService.translate(groupName), series);
  }

  fillMissingIntervals(data: any[], intervalMinutes: number): any[] {
    const filledData: any = [];
    if(!data || data.length === 0) return filledData;
    let currentDate = new Date(data[0].intervalStart); // Start with the first record
    const endDate = new Date(data[data.length - 1].intervalStart); // End with the last record
    let dataIndex = 0;
    while (currentDate <= endDate) {
      const currentInterval = data[dataIndex] ? new Date(data[dataIndex].intervalStart) : null;
      if (currentInterval && currentInterval.getTime() === currentDate.getTime()) {
        filledData.push(data[dataIndex]);
        dataIndex++;
      } else {
        filledData.push({
          intervalStart: currentDate.toISOString(),
          checkinCount: 0
        });
      }
      currentDate = new Date(currentDate.getTime() + intervalMinutes * 60000); // 60000 ms = 1 minute
    }
    return filledData;
  }

}
