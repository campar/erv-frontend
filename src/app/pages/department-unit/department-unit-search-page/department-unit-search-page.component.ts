import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {DepartmentUnitStructure} from '../../../features/entities/department-unit/department-unit-structure';
import {
  DepartmentUnitTableViewComponent
} from '../../../features/entities/department-unit/department-unit-table-view/department-unit-table-view.component';
import {
  DepartmentUnitSearchFormComponent
} from '../../../features/entities/department-unit/department-unit-search-form/department-unit-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-department-unit-search-page',
  standalone: true,
  imports: [
    DepartmentUnitTableViewComponent,
    DepartmentUnitSearchFormComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    MenuModule
  ],
  templateUrl: './department-unit-search-page.component.html',
  styleUrl: './department-unit-search-page.component.css'
})

export class DepartmentUnitSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: DepartmentUnitStructure = DepartmentUnitStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("department_unit")){
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
