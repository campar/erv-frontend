import {Component, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {GenericSearchFormComponent} from "../../../shared/components/generic-search-form/generic-search-form.component";
import {UserService} from "../../services/user.service";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {AppDate} from "../../../shared/utils/app-date";

@Component({
  selector: 'app-leaving-arrival-report-search-form',
  standalone: true,
  imports: [
    GenericSearchFormComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    PrimeModule,
    ReactiveFormsModule
  ],
  templateUrl: './leaving-arrival-report-search-form.component.html',
  // templateUrl: '../../../shared/components/generic-search-form/generic-search-form.component.html',
  styleUrls: ['./leaving-arrival-report-search-form.component.scss', '../../../shared/components/generic-form/generic-form.component.scss']
})
export class LeavingArrivalReportSearchFormComponent extends GenericSearchFormComponent {
  private userService: UserService = inject(UserService);

  override ngOnInit(): void {
    super.ngOnInit();
    this.form?.get('showErrorsOnly')?.setValue(true);
  }

  override onSubmit() {
    const searchDTO = this.prepareSearch();

    const DTO = {
      pageNumber: searchDTO.pageNumber,
      pageSize: searchDTO.pageSize,
      sort: searchDTO.sort,
      dateFrom: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key == 'date')?.value[0]).toString(),
      dateTo: AppDate.from(searchDTO.filterGroup.filters.find(e => e.key == 'date')?.value[1]).toEndOfDay().toString(),
      shifts: searchDTO.filterGroup.filters.find(e => e.key === 'shift')?.value ?? [],
      departmentUnit: searchDTO.filterGroup.filters.filter(e => e.key === "departmentUnit")[0]?.value,
      showErrorsOnly: this.form?.get('showErrorsOnly')?.value ?? false
    }
    localStorage.setItem("leaving-arrival-report-search-dto", JSON.stringify(DTO));
    this.searchService.emitEvent(this.userService.getLeavingArrivalReport(DTO, "user"));
    this.searchService.emitSearchEvent(true);
  }
}
