import {Component, inject} from '@angular/core';
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {UserService} from "../../services/user.service";
import {Page} from '../../../core/entity-utils/page';
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {BlobService} from '../../../core/services/blob.service';
import {PrimeModule} from '../../../shared/prime/prime.modules';

@Component({
  selector: 'app-absence-report-table-view',
  standalone: true,
  imports: [
    NgForOf, NgIf, RouterLink, RouterLinkActive, PrimeModule
  ],
  templateUrl: './absence-report-table-view.component.html',
  styleUrls: ['./absence-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class AbsenceReportTableViewComponent extends GenericTableViewComponent {
  userService = inject(UserService);
  blobService = inject(BlobService);
  override tableName = "AbsenceReport";


  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("absence-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.userService.getAbsenceReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  downloadPDF(): void {
    const searchDTO = JSON.parse(localStorage.getItem("absence-report-search-dto") ?? "{}");

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let date = formatDate(searchDTO.date , 'd-M-y', 'en-US')
      this.userService.getAbsenceReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Izveštaj-prisutnosti-odsutnosti' + (date ? ('-' + date) : '') + '.pdf');
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
    const searchDTO = JSON.parse(localStorage.getItem("absence-report-search-dto") ?? "{}");

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let date = formatDate(searchDTO.date , 'd-M-y', 'en-US')
      this.userService.getAbsenceReportCsv(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadXlsx(byteArray, 'Izveštaj-prisutnosti-odsutnosti' + (date ? ('-' + date) : '') + '.csv');
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
