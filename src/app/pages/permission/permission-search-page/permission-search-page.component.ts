import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {PermissionStructure} from '../../../features/entities/permission/permission-structure';
import {
  PermissionTableViewComponent
} from '../../../features/entities/permission/permission-table-view/permission-table-view.component';
import {
  PermissionSearchFormComponent
} from '../../../features/entities/permission/permission-search-form/permission-search-form.component';
import {PrimeModule} from "../../../shared/prime/prime.modules";

@Component({
  selector: 'app-permission-search-page',
  standalone: true,
  imports: [
    PermissionTableViewComponent,
    PermissionSearchFormComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    PrimeModule
  ],
  templateUrl: './permission-search-page.component.html',
  styleUrl: './permission-search-page.component.css'
})

export class PermissionSearchPageComponent {
  structure: PermissionStructure = PermissionStructure.instance;
  searchService: SearchService = inject(SearchService);
}
