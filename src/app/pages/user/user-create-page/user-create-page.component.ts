import {Component} from '@angular/core';
import {UserInsertFormComponent} from '../../../features/entities/user/user-insert-form/user-insert-form.component';
import {UserStructure} from '../../../features/entities/user/user-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ProgressBarModule} from "primeng/progressbar";
import {UserSearchFormComponent} from "../../../features/entities/user/user-search-form/user-search-form.component";
import {UserTableViewComponent} from "../../../features/entities/user/user-table-view/user-table-view.component";
import {Attribute} from "../../../core/entity-utils/attribute";

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [UserInsertFormComponent, BreadcrumbComponent, Button, DialogModule, InputTextModule, MenuModule, NgIf, PrimeTemplate, ProgressBarModule, UserSearchFormComponent, UserTableViewComponent],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})

export class UserCreatePageComponent {
  structure: UserStructure = UserStructure.instance;
}
