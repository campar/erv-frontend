import {Component, inject} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Button} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import {PrimeTemplate} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TranslatePipe} from "../../../../core/pipes/translate.pipe";
import {User} from "../user";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-user-table-view',
  standalone: true,
  imports: [GenericTableViewComponent, Button, ConfirmDialogModule, DatePipe, NgForOf, NgIf, PrimeModule, PrimeTemplate, SkeletonModule, TableModule, TagModule, TranslatePipe],
  templateUrl: './user-table-view.component.html',
  styleUrls: ['./user-table-view.component.css', '../../../../shared/components/generic-table-view/generic-table-view.component.scss']
})

export class UserTableViewComponent extends GenericTableViewComponent {
  private authService = inject(AuthService);

  isCurrentUser(value: User) {
    return value.username === this.authService.getUsername();
  }
}
