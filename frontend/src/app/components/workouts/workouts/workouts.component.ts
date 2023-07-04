import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WorkoutService } from 'src/app/services/workout/workout.service';
import { IAppState } from 'src/app/state/app.state';
import { WorkoutActions } from 'src/app/state/workouts/workouts.actions';
import { selectAllWorkouts } from 'src/app/state/workouts/workouts.selectors';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  workouts$ = this.store.select(selectAllWorkouts);

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(WorkoutActions.getWorkouts());
  }
}
