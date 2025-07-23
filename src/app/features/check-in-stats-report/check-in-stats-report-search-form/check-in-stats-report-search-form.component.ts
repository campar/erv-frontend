import {Component, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {DeviceService} from "../../services/device.service";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {ReactiveFormsModule} from "@angular/forms";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-check-in-stats-report-search-form',
  standalone: true,
  imports: [
    GenericSearchFormComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    PrimeModule,
    ReactiveFormsModule
  ],
  templateUrl: '../../../shared/components/generic-search-form/generic-search-form.component.html',
  styleUrls: ['./check-in-stats-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class CheckInStatsReportSearchFormComponent extends GenericSearchFormComponent {
  private deviceService: DeviceService = inject(DeviceService);

  override onSubmit() {
    const searchDTO = this.prepareSearch();
    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      dateFrom: AppDate.from(searchDTO.filterGroup.filters[0].value[0]).toString(),
      dateTo: AppDate.from(searchDTO.filterGroup.filters[0].value[1]).toEndOfDay().toString(),
    }
    localStorage.setItem("check-in-stats-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.deviceService.getCheckInStatsReport(DTO, "device"));
    this.searchService.emitSearchEvent(true);
  }
}
