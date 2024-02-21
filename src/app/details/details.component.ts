import { Component, inject } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule, NgOptimizedImage],
  templateUrl: `details.component.html`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  evaluation:number = 5;
  send:number = 5;
  applyForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('', Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
  evaluationEqual(){
    if (this.housingLocation)
      return this.evaluation== 3;
    else
      return false;
  }
  evaluationUp(){
    if (this.housingLocation)
      return this.evaluation >= 4;
    else
      return false;
  }
  evaluationDown(){
    if (this.housingLocation)
      return this.evaluation <= 2;
    else
      return false;
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
    this.applyForm.reset();
    window.alert('Form submitted');

  }
  submitEvaluation() {

    this.evaluation = this.send;
    alert("Send")


  }
}
