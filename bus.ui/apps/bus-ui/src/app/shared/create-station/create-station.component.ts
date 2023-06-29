import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { StationCreate } from '../../interfaces/bus-interface';

@Component({
	selector: 'bus-ui-create-station',
	templateUrl: './create-station.component.html',
	styleUrls: ['./create-station.component.scss'],
})
export class CreateStationComponent {
	customerForm!: FormGroup;
	@Output() closeDialog = new EventEmitter<boolean>();
	constructor(private apiService: ApiService, private formBuilder: FormBuilder) {}
	stationForm!: FormGroup;

	ngOnInit() {
		this.stationForm = this.formBuilder.group({
			name: ['', Validators.required],
			longitude: [null, Validators.required],
			latitude: [null, Validators.required],
			address: ['', Validators.required],
			country: ['', Validators.required],
			zip: ['', Validators.required],
			city: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.stationForm.valid) {
			const formData: StationCreate = this.stationForm.value;
			// Do something with the form data, e.g., send it to a server
			console.log(formData);

			this.apiService.createStation(formData).subscribe((response) => {
				console.log(response);
				this.closeDialog.emit(true);
			});
		} else {
			// Handle invalid form
			console.log('Invalid form');
		}
	}
}
