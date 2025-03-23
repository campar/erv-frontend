import { Component, Input } from '@angular/core';
import { GenericSearchFormComponent } from "../../../../shared/components/generic-search-form/generic-search-form.component";
import { CardStructure } from '../card-structure';

@Component({
	selector: 'app-card-search-form',
	standalone: true,
	imports: [ GenericSearchFormComponent ],
	templateUrl: './card-search-form.component.html',
	styleUrl: './card-search-form.component.css'
})

export class CardSearchFormComponent {
	@Input() structure!: CardStructure;
}
