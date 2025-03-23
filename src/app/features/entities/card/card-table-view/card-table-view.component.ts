import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";
import { Attribute } from '../../../../core/entity-utils/attribute';

@Component({
  selector: 'app-card-table-view',
  standalone: true,
  imports: [GenericTableViewComponent],
  templateUrl: './card-table-view.component.html',
  styleUrl: './card-table-view.component.css'
})

export class CardTableViewComponent {
  @Input() structure?: Structure;

  tableAttributes: Attribute[] = [
    new Attribute(
      'user',
      'User'
    ),
    new Attribute(
      'rfid',
      'string',
    ),
    new Attribute(
      'active',
      'boolean',
    ),
    new Attribute(
      'description',
      'string',
    ),
    new Attribute(
      'expirationDate',
      'datetime-local',
    ),
    new Attribute(
      'cardType',
      'enum',
    )
  ];
}
