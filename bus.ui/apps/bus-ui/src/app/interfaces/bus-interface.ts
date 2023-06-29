export interface StationInterface {
	id: number;
	name: string;
	longitude: number;
	latitude: number;
	address: string;
	country: string;
	zip: string;
	city: string;
}

export interface CreateResponse {
	message?: string;
}

export interface StationCreate {
	name: string;
	longitude: number;
	latitude: number;
	address: string;
	country: string;
	zip: string;
	city: string;
}

export interface TourInterface {
	firstName: string;
	lastName: string;
	email: string;
	startDestination: number;
	endDestination: number;
}

export interface TourData {
	id: number;
	startStationId: number;
	endStationId: number;
	customerId: number;
	startStation: string;
	endStation: string;
	customerFirstName: string;
	customerLastName: string;
	customerEmail: string;
  }


  export interface SreachResult {
	id: number;
	startStationId: number;
	endStationId: number;
	customerId: number;
	startStation: string;
	endStation: string;
	firstName: string;
	lastName: string;
	email: string;
  }
