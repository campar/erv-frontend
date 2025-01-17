import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {SearchService} from "../../../core/services/search.service";
import {UserStructure} from '../../../features/entities/user/user-structure';
import {UserTableViewComponent} from '../../../features/entities/user/user-table-view/user-table-view.component';
import {UserSearchFormComponent} from '../../../features/entities/user/user-search-form/user-search-form.component';
import {UserService} from "../../../features/services/user.service";
import {MenuItem} from "primeng/api";
import {TranslationService} from "../../../core/services/translation.service";
import {PrimeModule} from "../../../shared/prime/prime.modules";
import {ToastService} from '../../../core/services/toast.service';
import {Attribute} from "../../../core/entity-utils/attribute";
import {PermissionService} from '../../../core/services/permission.service';

@Component({
  selector: 'app-user-search-page',
  standalone: true,
  imports: [
    UserTableViewComponent,
    UserSearchFormComponent,
    NgIf,
    PrimeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-search-page.component.html',
  styleUrl: './user-search-page.component.css',
})

export class UserSearchPageComponent implements AfterViewInit {
  structure: UserStructure = UserStructure.instance;
  searchService: SearchService = inject(SearchService);
  translationService = inject(TranslationService);
  userService = inject(UserService);
  toastService = inject(ToastService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  permissionService = inject(PermissionService);

  showLoader: boolean = false;
  displayDialog: boolean = false;
  selectedFile: File | null = null;

  tableAttributes: Attribute[] = this.structure.attributes.filter(e => e.attr_name !== 'password' && e.attr_name !== 'adminAccessibleDepartmentUnits');

  items: MenuItem[] = [];

  ngAfterViewInit(): void {
    if (this.permissionService.hasPermission("can_import_users")) {
      this.items.push(
        {
          label: this.translationService.translate('upload'),
          icon: 'pi pi-upload',
          command: () => {
            this.displayDialog = true;
          }
        })
    }
    if (this.permissionService.containsCreatePermission("user")) {
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file || null;
  }

  onUpload() {
    if (this.selectedFile) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.userService.importUsers(formData).subscribe({
        next: () => {
          this.toastService.showSuccess("user.upload_success");
          this.displayDialog = false;
          this.showLoader = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.showLoader = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

}
