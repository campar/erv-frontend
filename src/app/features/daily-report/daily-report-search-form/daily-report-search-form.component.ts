import {Component, inject} from '@angular/core';
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {ReactiveFormsModule} from "@angular/forms";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-daily-report-search-form',
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
  styleUrls: ['./daily-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class DailyReportSearchFormComponent extends GenericSearchFormComponent {
  private userService: UserService = inject(UserService);

  override onSubmit() {
    const searchDTO = this.prepareSearch();
    const filters = searchDTO.filterGroup.filters;
    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      user: filters.filter(e => e.key === "user")[0]?.value,
      dateTime: AppDate.from(filters.filter(e => e.key === "dateTime")[0]?.value).toString(),
      recordNumber: filters.filter(e => e.key === "recordNumber")[0]?.value,
      departmentUnit: filters.filter(e => e.key === "departmentUnit")[0]?.value,
    }
    localStorage.setItem("daily-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.userService.getDailyReport(DTO, "user"));
    this.searchService.emitSearchEvent(true);
  }
}
