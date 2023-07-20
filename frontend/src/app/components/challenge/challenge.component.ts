import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IChallenge } from 'src/app/models/IChallenge';
import { IAppState } from 'src/app/state/app.state';
import { selectCurrentChallenge } from 'src/app/state/challenges/challenger.selector';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';
import { WeightEntryFormComponent } from '../weight-entry-form/weight-entry-form.component';
import { selectWeightEntryError } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit, OnDestroy {
  currentChallenge$ = this.store.select(selectCurrentChallenge);
  weightEntryError$ = this.store.select(selectWeightEntryError);
  currentChallenge: IChallenge | undefined;
  subscription: Subscription | undefined;
  daysRemaining: number | undefined;

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.currentChallenge$.subscribe((result) => {
      if (result !== null) {
        this.currentChallenge = result;
        this.daysRemaining = this.calculateDaysRemaining(
          new Date(this.currentChallenge?.endDate)
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  resetView() {
    this.store.dispatch(ChallengeActions.resetCurrentChallenge());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WeightEntryFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  calculateDaysRemaining(endDate: Date): number {
    return Math.floor(
      Math.abs(endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
