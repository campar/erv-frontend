import {Component, inject} from '@angular/core';
import {DatePipe, formatDate, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {UserService} from "../../services/user.service";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {Page} from "../../../core/entity-utils/page";
import {RouterLink} from "@angular/router";
import {BlobService} from '../../../core/services/blob.service';
import {PrimeModule} from '../../../shared/prime/prime.modules';
import {SortEvent} from "primeng/api";
import {Order} from "../../../core/entity-utils/order";
import {OrderDirection} from "../../../core/entity-utils/order-direction";

@Component({
  selector: 'app-leaving-arrival-report-table-view',
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
  templateUrl: './leaving-arrival-report-table-view.component.html',
  styleUrls: ['./leaving-arrival-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class LeavingArrivalReportTableViewComponent extends GenericTableViewComponent {
  userService = inject(UserService);
  blobService = inject(BlobService);
  override tableName = "LeavingArrivalReport";
  expandedGroups: { [user: string]: { [date: string]: boolean } } = {};

  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("leaving-arrival-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.userService.getLeavingArrivalReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  protected override updateData(data: Page | undefined): void {
    super.updateData(data);
    this.setAllGroupsExpanded();
  }

  setAllGroupsExpanded() {
    this.expandedGroups = {};
    this.dataSource.forEach(row => {
      const expandedRowKeys: { [key: string]: boolean } = {};
      row.dateTimetables?.forEach((group: any) => {
        expandedRowKeys[group.timetableDate] = true;
      });
      this.expandedGroups[row.user] = expandedRowKeys;
    });
  }

  downloadPDF(): void {
    let searchDTOString = localStorage.getItem("leaving-arrival-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.userService.getLeavingArrivalReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Kašnjenja-odlasci' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.pdf');
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

  downloadCsv(): void {
    let searchDTOString = localStorage.getItem("leaving-arrival-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.userService.getLeavingArrivalReportCsv(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadXlsx(byteArray, 'Kašnjenja-odlasci' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.xlsx');
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

  protected override prepareSortChange(event: SortEvent, searchDto: SearchDTO): SearchDTO {
    searchDto = super.prepareSortChange(event, searchDto);
    // If the field is departmentUnit (here called 'code') then we need to customize the sort.
    if (event.field === 'departmentUnit') {
      let departmentUnit = searchDto.sort.find(e => e.property === 'code');
      searchDto.sort = searchDto.sort.filter(e => e.property !== 'code');
      searchDto.sort.push(new Order('departmentUnit', departmentUnit?.direction || OrderDirection.ASC));
    }
    return searchDto;
  }
}
