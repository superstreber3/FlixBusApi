import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BusInterface } from './interfaces/bus-interface';

@Component({
	selector: 'bus-ui-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'bus-ui';
	buses: Array<BusInterface> = [];
	constructor(private httpClient: HttpClient) {
		this.httpClient.get('http://localhost:1221/stations').subscribe((x) => {
			this.buses = x as Array<BusInterface>;
			console.log(x);

		})
	}
}
