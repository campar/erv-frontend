import {Component, EventEmitter, inject, Output} from '@angular/core';
import {GenericTableViewComponent} from "../../../shared/components/generic-table-view/generic-table-view.component";
import {DatePipe, formatDate, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "../../../core/pipes/translate.pipe";
import {RouterLink} from "@angular/router";
import {SearchDTO} from "../../../core/entity-utils/search-dto";
import {Page} from "../../../core/entity-utils/page";
import {TimetableService} from "../../services/timetable.service";
import {BlobService} from '../../../core/services/blob.service';
import {PrimeModule} from '../../../shared/prime/prime.modules';

@Component({
  selector: 'app-individual-report-table-view',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslatePipe,
    RouterLink,
    DatePipe,
    PrimeModule
  ],
  templateUrl: './individual-report-table-view.component.html',
  styleUrls: ['./individual-report-table-view.component.scss', '../../../shared/components/generic-table-view/generic-table-view.component.scss']
})
export class IndividualReportTableViewComponent extends GenericTableViewComponent {
  @Output() dataChange = new EventEmitter<any>();
  timetableService: TimetableService = inject(TimetableService);
  blobService: BlobService = inject(BlobService);

  override tableChangeSearch(dto: SearchDTO, entity: string) {
    this.loading = true;
    let searchDTOString = localStorage.getItem("individual-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    searchDTO['pageNumber'] = dto.pageNumber;
    searchDTO['pageSize'] = dto.pageSize;
    searchDTO['sort'] = dto.sort;
    this.performSubscription(this.timetableService.getIndividualReport(searchDTO, entity), (data: Page | undefined) => {
      this.updateData(data);
    });
  }

  downloadPDF(): void {
    let searchDTOString = localStorage.getItem("individual-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};

    if (this.dataSource.length > 0) {
      this.showLoader = true;
      let dateFrom = formatDate(searchDTO.dateFrom , 'd-M-y', 'en-US')
      let dateTo = formatDate(searchDTO.dateTo , 'd-M-y', 'en-US')
      this.timetableService.getIndividualReportPDF(searchDTO, this.entity).subscribe(
        (data: Blob) => {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const byteArray = new Uint8Array(reader.result as ArrayBuffer);
              this.blobService.downloadPdf(byteArray, 'Pojedinačni-izveštaj' + ((dateFrom && dateTo) ? ('-' + dateFrom + '-' + dateTo) : '') + '.pdf');
            };
            reader.readAsArrayBuffer(data);
          } catch (e) {
            this.showLoader = false;
            console.log(e);
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
    let searchDTOString = localStorage.getItem("individual-report-search-dto");
    let searchDTO = searchDTOString ? JSON.parse(searchDTOString) : {};
    this.first = this.page?.number ? this.page.size * this.page.number : 0;
    this.totalRecords = this.page?.totalElements || 0;
    let chartData = {
      dateFrom: searchDTO.dateFrom,
      dateTo: searchDTO.dateTo,
      data: data?.content
    }
    this.dataChange.emit(chartData);
    this.loading = false;
  }
}

