import {Component, inject} from '@angular/core';
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {UserService} from "../../services/user.service";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {Page} from "../../../core/entity-utils/page";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {RouterLink} from "@angular/router";
import {BlobService} from '../../../core/services/blob.service';

import {PrimeModule} from '../../../shared/prime/prime.modules';

@Component({
  selector: 'app-working-hours-report-table-view',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslatePipe,
    RouterLink,
    PrimeModule
  ],
  templateUrl: './working-hours-report-table-view.component.html',
  styleUrls: ['./working-hours-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class WorkingHoursReportTableViewComponent extends GenericTableViewComponent {
  userService = inject(UserService);
  blobService = inject(BlobService);
  override tableName = "WorkingHoursReport";

  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("working-hours-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.userService.getWorkingHoursReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  downloadPDF(): void {
    let searchDTOString = localStorage.getItem("working-hours-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.userService.getWorkingHoursReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Obračun-radnih-sati' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.pdf');
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
    let searchDTOString = localStorage.getItem("working-hours-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.userService.getWorkingHoursReportCsv(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadXlsx(byteArray, 'Obračun-radnih-sati' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.csv');
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
}
