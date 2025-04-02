import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { CardUpdateFormComponent } from '../../../features/entities/card/card-update-form/card-update-form.component';
import { CardStructure } from '../../../features/entities/card/card-structure';
import {BreadcrumbComponent} from "../../../shared/components/breadcrumb/breadcrumb.component";
import {UserUpdateFormComponent} from "../../../features/entities/user/user-update-form/user-update-form.component";

@Component({
	selector: 'app-card-edit-page',
	standalone: true,
    imports: [CardUpdateFormComponent, BreadcrumbComponent, UserUpdateFormComponent],
	templateUrl: './card-edit-page.component.html',
	styleUrl: './card-edit-page.component.css'
})

export class CardEditPageComponent implements OnInit {
	structure: CardStructure = CardStructure.instance;
	id: any;
	route = inject(ActivatedRoute);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
	}
}
