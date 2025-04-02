import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {CardStructure} from '../../../features/entities/card/card-structure';
import {CardTableViewComponent} from '../../../features/entities/card/card-table-view/card-table-view.component';
import {CardSearchFormComponent} from '../../../features/entities/card/card-search-form/card-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {
  PermissionSearchFormComponent
} from "../../../features/entities/permission/permission-search-form/permission-search-form.component";
import {
  PermissionTableViewComponent
} from "../../../features/entities/permission/permission-table-view/permission-table-view.component";
import {MenuItem} from "primeng/api";
import {TranslationService} from "../../../core/services/translation.service";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-card-search-page',
  standalone: true,
  imports: [
    CardTableViewComponent,
    CardSearchFormComponent,

    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    MenuModule,
    PermissionSearchFormComponent,
    PermissionTableViewComponent
  ],
  templateUrl: './card-search-page.component.html',
  styleUrl: './card-search-page.component.css'
})

export class CardSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: CardStructure = CardStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("card")){
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
