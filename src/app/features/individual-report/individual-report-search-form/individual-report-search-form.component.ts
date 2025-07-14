import {Component, inject} from '@angular/core';
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TimetableService} from "../../services/timetable.service";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-individual-report-search-form',
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
  styleUrls: ['./individual-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class IndividualReportSearchFormComponent extends GenericSearchFormComponent {
  private timetableService: TimetableService = inject(TimetableService);

  override onSubmit() {
    const searchDTO = this.prepareSearch();
    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      user: searchDTO.filterGroup.filters.find(e => e.key === "user")?.value,
      dateFrom: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key === "date")?.value[0]).toString(),
      dateTo: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key === "date")?.value[1]).toEndOfDay().toString()
    }
    localStorage.setItem("individual-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.timetableService.getIndividualReport(DTO, "timetable"));
    this.searchService.emitSearchEvent(true);
  }
}
