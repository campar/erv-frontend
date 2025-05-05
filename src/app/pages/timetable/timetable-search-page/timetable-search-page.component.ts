import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";

import {SearchService} from "../../../core/services/search.service";
import {TimetableStructure} from '../../../features/entities/timetable/timetable-structure';
import {
  TimetableTableViewComponent
} from '../../../features/entities/timetable/timetable-table-view/timetable-table-view.component';
import {
  TimetableSearchFormComponent
} from '../../../features/entities/timetable/timetable-search-form/timetable-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {CardSearchFormComponent} from "../../../features/entities/card/card-search-form/card-search-form.component";
import {CardTableViewComponent} from "../../../features/entities/card/card-table-view/card-table-view.component";
import {MenuModule} from "primeng/menu";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-timetable-search-page',
  standalone: true,
  imports: [
    TimetableTableViewComponent,
    TimetableSearchFormComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    CardSearchFormComponent,
    CardTableViewComponent,
    MenuModule
  ],
  templateUrl: './timetable-search-page.component.html',
  styleUrl: './timetable-search-page.component.css'
})

export class TimetableSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: TimetableStructure = TimetableStructure.instance;
  searchService: SearchService = inject(SearchService);

  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("timetable")){
      this.items.push(
        {
          label: this.translationService.translate('new'),
          icon: 'pi pi-plus',
          routerLink: 'create',
          command: () => {
          }
        })
    }
    this.cdr.detectChanges();
  }
}
