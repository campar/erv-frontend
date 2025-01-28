import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";

import {SearchService} from "../../../core/services/search.service";
import {RoleStructure} from '../../../features/entities/role/role-structure';
import {RoleTableViewComponent} from '../../../features/entities/role/role-table-view/role-table-view.component';
import {RoleSearchFormComponent} from '../../../features/entities/role/role-search-form/role-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {CardSearchFormComponent} from "../../../features/entities/card/card-search-form/card-search-form.component";
import {CardTableViewComponent} from "../../../features/entities/card/card-table-view/card-table-view.component";
import {MenuModule} from "primeng/menu";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import {Attribute} from '../../../core/entity-utils/attribute';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-role-search-page',
  standalone: true,
  imports: [
    RoleTableViewComponent,
    RoleSearchFormComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    CardSearchFormComponent,
    CardTableViewComponent,
    MenuModule
  ],
  templateUrl: './role-search-page.component.html',
  styleUrl: './role-search-page.component.css'
})

export class RoleSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: RoleStructure = RoleStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("role")){
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

  tableAttributes: Attribute[] = [
    new Attribute(
      'name',
      'string',
      null,
      null
    ),
    new Attribute(
      'description',
      'string',
      null,
      null
    )
  ];
}

