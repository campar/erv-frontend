import {Component, Input} from '@angular/core';
import {GenericTableViewComponent} from "../../../../shared/components/generic-table-view/generic-table-view.component";
import {Structure} from "../../structure";
import { PrimeModule } from '../../../../shared/prime/prime.modules';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { Page } from '../../../../core/entity-utils/page';

@Component({
	selector: 'app-device-table-view',
	standalone: true,
	imports: [GenericTableViewComponent, PrimeModule, ConfirmDialogModule],
	templateUrl: './device-table-view.component.html',
	styleUrl: './device-table-view.component.css'
})

export class DeviceTableViewComponent extends GenericTableViewComponent{
	protected searchDate!: Date;
	protected lastOnlineMinuteTolerance: number = 10;
	

	override ngOnInit(): void {
		super.ngOnInit();
		this.searchDate = new Date();
	}

	protected override updateData(page: Page | undefined): void {
		this.searchDate = new Date();
		super.updateData(page);
	}

	protected isDeviceOnline(date: any): boolean {
	if (!date) {
		return false;
	}

	const lastOnline = date instanceof Date ? date : new Date(date);

	const diffMs = this.searchDate.getTime() - lastOnline.getTime();
	const diffMinutes = diffMs / (1000 * 60);

	return diffMinutes <= this.lastOnlineMinuteTolerance;
}
}
