import { Component } from '@angular/core';
import { CardInsertFormComponent } from '../../../features/entities/card/card-insert-form/card-insert-form.component';
import { CardStructure } from '../../../features/entities/card/card-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-card-create-page',
	standalone: true,
  imports: [CardInsertFormComponent, BreadcrumbComponent],
	templateUrl: './card-create-page.component.html',
	styleUrl: './card-create-page.component.css'
})

export class CardCreatePageComponent {
	structure: CardStructure = CardStructure.instance;
}
