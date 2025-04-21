import {Component} from '@angular/core';
import {
  GenericSearchFormComponent
} from "../../../../shared/components/generic-search-form/generic-search-form.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PrimeModule} from '../../../../shared/prime/prime.modules';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchDTO} from "../../../../core/entity-utils/search-dto";
import {Order} from "../../../../core/entity-utils/order";

@Component({
  selector: 'app-timetable-search-form',
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe, PrimeModule, ReactiveFormsModule, GenericSearchFormComponent],
  templateUrl: '../../../../shared/components/generic-search-form/generic-search-form.component.html',
  styleUrls: ['./timetable-search-form.component.css', '../../../../shared/components/generic-search-form/generic-search-form.component.scss', '../../../../shared/components/generic-form/generic-form.component.scss']
})
export class TimetableSearchFormComponent extends GenericSearchFormComponent {
  protected override prepareSearch(): SearchDTO {
    let dto = super.prepareSearch();
    if (dto.sort.length === 0) {
      dto.sort = [new Order('dateTime', 'desc')]
    }
    this.queryService.saveToStorage(this.tableName, dto);
    return dto;
  }
}
