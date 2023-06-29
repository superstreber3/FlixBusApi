import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationInterface } from '../../interfaces/bus-interface';

export interface DialogData {
	type: 'create-station' | 'create-tour';

	title?: string;

	stations?: Array<StationInterface>;
}

@Component({
	selector: 'bus-ui-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<AddDialogComponent>) {}

	close(event: any) {
		console.log(event);
		this.dialogRef.close();
	}
}
