import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SreachResult, TourInterface, StationCreate, StationInterface, TourData } from '../../interfaces/bus-interface';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	baseUrl = 'http://localhost:1221';

	constructor(private httpClient: HttpClient) {}

	//1.
	createTour(tour: TourInterface): Observable<any> {
		return this.httpClient.post<any>(`${this.baseUrl}/createTour`, tour);
	}

	//2.
	getAllTours(): Observable<Array<TourData>> {
		return this.httpClient.get<Array<TourData>>(`${this.baseUrl}/tours`);
	}

	//3.
	getToursByCustomerEmial(email: string) {
		return this.httpClient.get<Array<SreachResult>>(`${this.baseUrl}/tours/:${email}`);
	}

	//4.
	createStation(bus: StationCreate): Observable<any> {
		return this.httpClient.post(`${this.baseUrl}/createStation`, bus);
	}

	//5.
	getAllStations(): Observable<Array<StationInterface>> {
		return this.httpClient.get<Array<StationInterface>>(`${this.baseUrl}/stations`);
	}
}
