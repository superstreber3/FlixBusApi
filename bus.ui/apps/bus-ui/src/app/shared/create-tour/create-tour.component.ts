import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { StationInterface, TourInterface } from '../../interfaces/bus-interface';

@Component({
	selector: 'bus-ui-create-tour',
	templateUrl: './create-tour.component.html',
	styleUrls: ['./create-tour.component.scss'],
})
export class CreateTourComponent {
	customerForm!: FormGroup;
	@Input() stations?: Array<StationInterface>;
	@Output() closeDialog = new EventEmitter<boolean>();
	constructor(private apiService: ApiService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.customerForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			startDestination: ['', Validators.required],
			endDestination: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.customerForm.valid) {
			const formData = this.customerForm.value as TourInterface;
			// Do something with the form data, e.g., send it to a server
			console.log(formData);

			this.apiService.createTour(formData).subscribe((response) => {
				console.log(response);
				this.closeDialog.emit(true);
			});
		} else {
			// Handle invalid form
			console.log('Invalid form');
		}
	}
}
