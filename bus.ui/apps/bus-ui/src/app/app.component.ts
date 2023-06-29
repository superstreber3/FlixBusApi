import { Component, OnInit } from '@angular/core';
import { SreachResult, StationInterface, TourData } from './interfaces/bus-interface';
import { ApiService } from './services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDialogComponent } from './shared/add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'bus-ui-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'bus-ui';
	stations: Array<StationInterface> = [];
	tours: Array<TourData> = [];
	dataSourceTour!: MatTableDataSource<TourData>;
	displayedColumns: string[] = ['name', 'longitude', 'latitude', 'address', 'country', 'zip', 'city'];
	displayedColumnsTour: string[] = ['customerFirstName', 'customerLastName', 'customerEmail', 'startStation', 'endStation'];
	searchEmail!: string;
	searchResults!: Array<SreachResult>;
	constructor(
		private apiService: ApiService,

		public dialog: MatDialog
	) {
		this.updateStationTable();
		this.updateTourTable();
	}

	addStation() {
		// type: 'create-station' | 'create-tour';
		const dialogRef = this.dialog.open(AddDialogComponent, {
			width: '600px',
			data: { type: 'create-station', title: 'Create Station' },
		});

		dialogRef.afterClosed().subscribe((result) => {
			this.updateStationTable();
		});
	}

	addTour() {
		// type: 'create-station' | 'create-tour';
		const dialogRef = this.dialog.open(AddDialogComponent, {
			width: '600px',
			data: { type: 'create-tour', title: 'Create Tourt', stations: this.stations },
		});

		dialogRef.afterClosed().subscribe((result) => {
			this.updateTourTable();

			this.filterByEmail();
		});
	}

	updateStationTable() {
		this.apiService.getAllStations().subscribe((stations) => {
			this.stations = stations;
			console.log(this.stations);
		});
	}
	updateTourTable() {
		this.apiService.getAllTours().subscribe((tours) => {
			this.tours = tours;
			this.dataSourceTour = new MatTableDataSource<TourData>(tours);
			console.log(this.tours);

		});
	}

	filterByEmail() {
		console.log(this.searchEmail);

		this.apiService.getToursByCustomerEmial(this.searchEmail).subscribe((tours) => {
			this.searchResults = tours;
			console.log(tours);

		});
	}
}
