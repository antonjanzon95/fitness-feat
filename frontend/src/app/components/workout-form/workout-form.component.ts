import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout/workout.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  successMsg: string = 'You have successfully added your workout!';
  failedMsg: string = 'Failed to add workout, please try again.';

  constructor(
    private formbuilder: FormBuilder,
    private workoutService: WorkoutService,
    private snackBar: MatSnackBar
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
          this.workoutForm.reset();
          this.snackBar.open(this.successMsg, 'Close', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(this.failedMsg, 'Close', {
            duration: 3000,
          });
        },
      });
  }
}
