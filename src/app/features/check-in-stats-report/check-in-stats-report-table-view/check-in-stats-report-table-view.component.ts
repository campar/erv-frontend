import {Component, EventEmitter, inject, Output} from '@angular/core';
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {Page} from "../../../core/entity-utils/page";
import {DeviceService} from "../../services/device.service";
import {DatePipe, formatDate, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {RouterLink} from "@angular/router";
import {BlobService} from '../../../core/services/blob.service';
import {Order} from "../../../core/entity-utils/order";
import {AppUtils} from "../../../shared/utils/app-utils";
import {PrimeModule} from '../../../shared/prime/prime.modules';
import {SortEvent} from 'primeng/api';
import {OrderDirection} from "../../../core/entity-utils/order-direction";

@Component({
  selector: 'app-check-in-stats-report-table-view',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslatePipe,
    RouterLink,
    DatePipe,
    KeyValuePipe,
    PrimeModule
  ],
  templateUrl: './check-in-stats-report-table-view.component.html',
  styleUrls: ['./check-in-stats-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class CheckInStatsReportTableViewComponent extends GenericTableViewComponent {
  @Output() dataChange = new EventEmitter<any[]>();
  deviceService: DeviceService = inject(DeviceService);
  blobService: BlobService = inject(BlobService);

  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("check-in-stats-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.deviceService.getCheckInStatsReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  downloadPDF(): void {
    const searchDTO = JSON.parse(localStorage.getItem("check-in-stats-report-search-dto") || "{}");

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.deviceService.getCheckInStatsReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Statistika-prolaza' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.pdf');
            };
            reader.readAsArrayBuffer(data);
          } catch (e) {
            this.showLoader = false;
            console.error(e);
          }
          this.showLoader = false;
        },
        (error) => {
          this.showLoader = false;
          console.error('Download error:', error);
        }
      );
    }
  }

  protected override updateData(data: Page | undefined) {
    this.page = data;
    this.dataSource = this.page ? this.page.content : [];
    this.dataSource = this.transformContent(this.dataSource);
    this.first = this.page?.number ? this.page.size * this.page.number : 0;
    this.totalRecords = this.page?.totalElements || 0;
    this.dataChange.emit(data?.content || []);
    this.loading = false;
  }

  protected override prepareSortChange(event: SortEvent, searchDto: SearchDTO): SearchDTO {
    searchDto = super.prepareSortChange(event, searchDto);
    let user = searchDto.sort.find(e => e.property === 'device');
    searchDto.sort = searchDto.sort.filter(e => e.property !== 'device');
    let sortAttr = AppUtils.getFkSearchAttribute('Device');
    for (let attr of sortAttr) {
      searchDto.sort.push(new Order(attr, user?.direction || OrderDirection.ASC));
    }
    return searchDto;
  }
}
