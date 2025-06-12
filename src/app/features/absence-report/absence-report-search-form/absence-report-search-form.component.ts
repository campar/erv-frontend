import {Component, inject} from '@angular/core';
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {UserService} from "../../services/user.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-absence-report-search-form',
  standalone: true,
  imports: [
    GenericSearchFormComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    PrimeModule,
    ReactiveFormsModule],
  templateUrl: '../../../shared/components/generic-search-form/generic-search-form.component.html',
  styleUrls: ['./absence-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class AbsenceReportSearchFormComponent extends GenericSearchFormComponent {
  private userService: UserService = inject(UserService);

  override onSubmit() {
    const searchDTO = this.prepareSearch();
    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      user: searchDTO.filterGroup.filters.filter(e => e.key === "user")[0]?.value,
      date: AppDate.from(searchDTO.filterGroup.filters.filter(e => e.key === "date")[0]?.value).toString(),
      departmentUnit: searchDTO.filterGroup.filters.filter(e => e.key === "departmentUnit")[0]?.value,
    }
    localStorage.setItem("absence-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.userService.getAbsenceReport(DTO, "user"));
    this.searchService.emitSearchEvent(true);
  }
}
