import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {DeviceStructure} from '../../../features/entities/device/device-structure';
import {
  DeviceTableViewComponent
} from '../../../features/entities/device/device-table-view/device-table-view.component';
import {
  DeviceSearchFormComponent
} from '../../../features/entities/device/device-search-form/device-search-form.component';
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {TranslationService} from "../../../core/services/translation.service";
import {MenuItem} from "primeng/api";
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-device-search-page',
  standalone: true,
  imports: [
    DeviceTableViewComponent,
    DeviceSearchFormComponent,
    RouterLink,
    RouterOutlet,
    NgIf,
    PrimeModule
  ],
  templateUrl: './device-search-page.component.html',
  styleUrl: './device-search-page.component.css'
})

export class DeviceSearchPageComponent implements AfterViewInit{
  permissionService: PermissionService = inject(PermissionService)
  structure: DeviceStructure = DeviceStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  items: MenuItem[] = [];
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  ngAfterViewInit(): void {
    if(this.permissionService.containsCreatePermission("device")){
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
