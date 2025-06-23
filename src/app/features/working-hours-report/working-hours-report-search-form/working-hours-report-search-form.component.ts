import {Component, inject} from '@angular/core';
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {UserService} from "../../services/user.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-working-hours-report-search-form',
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
  styleUrls: ['./working-hours-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class WorkingHoursReportSearchFormComponent extends GenericSearchFormComponent {
  private userService: UserService = inject(UserService);

  override onSubmit() {
    const searchDTO = this.prepareSearch();
    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      user: searchDTO.filterGroup.filters.find(e => e.key === "user")?.value,
      dateFrom: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key === "date")?.value[0]).toString(),
      dateTo: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key === "date")?.value[1]).toEndOfDay().toString(),
      departmentUnit: searchDTO.filterGroup.filters.find(e => e.key === "departmentUnit")?.value,
    }
    localStorage.setItem("working-hours-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.userService.getWorkingHoursReport(DTO, "user"));
    this.searchService.emitSearchEvent(true);
  }
}
