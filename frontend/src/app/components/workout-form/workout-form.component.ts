import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkoutActions } from 'src/app/state/workouts/workouts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<WorkoutFormComponent>,
    private store: Store
  ) {
    this.workoutForm = this.formbuilder.group({
      type: ['', Validators.required],
      duration: ['', Validators.required],
      intensity: ['', Validators.required],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.workoutForm.invalid) return;

    const workoutData = {
      type: this.workoutForm.value.type,
      duration: this.workoutForm.value.duration,
      intensity: this.workoutForm.value.intensity,
    };

    this.store.dispatch(WorkoutActions.addWorkout({ workout: workoutData }));
    this.workoutForm.reset();
  }
}
