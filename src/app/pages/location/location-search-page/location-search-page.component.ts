import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {LocationStructure} from '../../../features/entities/location/location-structure';
import {
  LocationTableViewComponent
} from '../../../features/entities/location/location-table-view/location-table-view.component';
import {
  LocationSearchFormComponent
} from '../../../features/entities/location/location-search-form/location-search-form.component';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {CardSearchFormComponent} from "../../../features/entities/card/card-search-form/card-search-form.component";
import {CardTableViewComponent} from "../../../features/entities/card/card-table-view/card-table-view.component";
import {MenuModule} from "primeng/menu";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-location-search-page',
  standalone: true,
  imports: [
    LocationTableViewComponent,
    LocationSearchFormComponent,

    RouterLink,
    RouterOutlet,
    NgIf,
    BreadcrumbComponent,
    Button,
    CardSearchFormComponent,
    CardTableViewComponent,
    MenuModule
  ],
  templateUrl: './location-search-page.component.html',
  styleUrl: './location-search-page.component.css'
})

export class LocationSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: LocationStructure = LocationStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("location")){
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

