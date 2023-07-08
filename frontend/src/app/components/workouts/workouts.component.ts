import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import { WorkoutActions } from 'src/app/state/workouts/workouts.actions';
import { selectAllWorkouts } from 'src/app/state/workouts/workouts.selectors';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  workouts$ = this.store.select(selectAllWorkouts);
  displayedColumns: string[] = ['type', 'duration', 'intensity', 'date'];
  addWorkoutSuccessSub: Subscription | undefined;
  addWorkoutFailureSub: Subscription | undefined;
  successMsg: string = 'You have successfully added your workout!';
  failedMsg: string = 'Failed to add workout, please try again.';

  constructor(
    private store: Store<IAppState>,
    public dialog: MatDialog,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(WorkoutActions.getWorkouts());

    this.addWorkoutSuccessSub = this.actions$
      .pipe(ofType(WorkoutActions.addWorkoutSuccess))
      .subscribe(() => {
        this.snackBar.open(this.successMsg, 'Close', {
          duration: 3000,
        });
      });

    this.addWorkoutFailureSub = this.actions$
      .pipe(ofType(WorkoutActions.addWorkoutFailure))
      .subscribe(() => {
        this.snackBar.open(this.failedMsg, 'Close', {
          duration: 3000,
        });
      });
  }

  ngOnDestroy(): void {
    this.addWorkoutFailureSub?.unsubscribe();
    this.addWorkoutSuccessSub?.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WorkoutFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
