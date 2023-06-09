import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout/workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.formbuilder.group({
      type: ['', Validators.required],
      duration: ['', Validators.required],
      intensity: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.workoutForm.invalid) return;

    const workoutData = {
      type: this.workoutForm.value.type,
      duration: this.workoutForm.value.duration,
      intensity: this.workoutForm.value.intensity,
    };

    this.workoutService
      .addWorkout(workoutData.type, workoutData.duration, workoutData.intensity)
      .subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
