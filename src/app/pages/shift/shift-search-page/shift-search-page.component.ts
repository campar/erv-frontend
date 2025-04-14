import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";

import {SearchService} from "../../../core/services/search.service";
import {ShiftStructure} from '../../../features/entities/shift/shift-structure';
import {ShiftTableViewComponent} from '../../../features/entities/shift/shift-table-view/shift-table-view.component';
import {ShiftSearchFormComponent} from '../../../features/entities/shift/shift-search-form/shift-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {CardSearchFormComponent} from "../../../features/entities/card/card-search-form/card-search-form.component";
import {CardTableViewComponent} from "../../../features/entities/card/card-table-view/card-table-view.component";
import {MenuModule} from "primeng/menu";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-shift-search-page',
  standalone: true,
  imports: [
    ShiftTableViewComponent,
    ShiftSearchFormComponent,

    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    CardSearchFormComponent,
    CardTableViewComponent,
    MenuModule
  ],
  templateUrl: './shift-search-page.component.html',
  styleUrl: './shift-search-page.component.css'
})

export class ShiftSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: ShiftStructure = ShiftStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("shift")){
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
