import {Component} from '@angular/core';
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

@Component({
  selector: 'app-permission-table-view',
  standalone: true,
  imports: [GenericTableViewComponent, Button, ConfirmDialogModule, DatePipe, NgForOf, NgIf, PrimeModule, PrimeTemplate, SkeletonModule, TableModule, TagModule, TranslatePipe],
  templateUrl: '../../../../shared/components/generic-table-view/generic-table-view.component.html',
  styleUrls: ['./permission-table-view.component.css', '../../../../shared/components/generic-table-view/generic-table-view.component.html']
})

export class PermissionTableViewComponent extends GenericTableViewComponent {

  override transformContent(dataSource: any[]): any[] {
    let content = super.transformContent(dataSource);
    content.forEach(e => e['description'] = this.translationService.translate('permission.' + e['name']));
    return content;
  }
}
