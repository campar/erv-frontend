import {Component, inject} from '@angular/core';
import {CommonModule, DatePipe, formatDate, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {BlobService} from "../../../core/services/blob.service";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {Page} from "../../../core/entity-utils/page";
import {UserService} from "../../services/user.service";
import {PrimeModule} from '../../../shared/prime/prime.modules';
import {SortEvent} from "primeng/api";
import {AppUtils} from "../../../shared/utils/app-utils";
import {Order} from "../../../core/entity-utils/order";
import {OrderDirection} from "../../../core/entity-utils/order-direction";

@Component({
  selector: 'app-daily-report-table-view',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    TranslatePipe,
    PrimeModule,
    CommonModule
  ],
  templateUrl: './daily-report-table-view.component.html',
  styleUrls: ['./daily-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class DailyReportTableViewComponent extends GenericTableViewComponent {
  userService: UserService = inject(UserService);
  blobService: BlobService = inject(BlobService);
  override tableName = "DailyReport";

  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("daily-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.userService.getDailyReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  protected override prepareSortChange(event: SortEvent, searchDto: SearchDTO): SearchDTO {
    searchDto = super.prepareSortChange(event, searchDto);
    let user = searchDto.sort.find(e => e.property === 'user');
    searchDto.sort = searchDto.sort.filter(e => e.property !== 'user');
    let sortAttr = AppUtils.getFkSearchAttribute('User');
    for (let attr of sortAttr) {
      searchDto.sort.push(new Order(attr, user?.direction || OrderDirection.ASC));
    }
    return searchDto;
  }

  downloadPDF(): void {
    
    let searchDTOString = localStorage.getItem("daily-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let date = formatDate(searchDTO.dateTime, 'd.M.y', 'en-US')
      this.userService.getDailyReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Dnevni-izveštaj' + (date ? ('-' + date) : '') + '.pdf');
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
    const searchDTO = JSON.parse(localStorage.getItem("daily-report-search-dto") ?? "{}");

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let date = formatDate(searchDTO.dateTime, 'd-M-y', 'en-US')
      this.userService.getDailyReportCsv(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadXlsx(byteArray, 'Dnevni-izveštaj' + (date ? ('-' + date) : '') + '.xlsx');
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
