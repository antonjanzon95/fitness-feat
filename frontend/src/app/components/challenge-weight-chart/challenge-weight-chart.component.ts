import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import {
  selectCurrentChallenge,
  selectCurrentChallengeWeightEntries,
} from 'src/app/state/challenges/challenger.selector';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';

@Component({
  selector: 'app-challenge-weight-chart',
  templateUrl: './challenge-weight-chart.component.html',
  styleUrls: ['./challenge-weight-chart.component.css'],
})
export class ChallengeWeightChartComponent implements OnInit, OnDestroy {
  challengeWeights$ = this.store.select(selectCurrentChallengeWeightEntries);
  currentChallenge$ = this.store.select(selectCurrentChallenge);
  currentChallengeSubscription: Subscription | undefined;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.currentChallengeSubscription = this.currentChallenge$.subscribe(
      (res) => {
        if (typeof res?._id !== 'string') return;
        this.store.dispatch(
          ChallengeActions.getCurrentChallengeWeightEntries({
            challengeId: res?._id,
          })
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.currentChallengeSubscription?.unsubscribe();
  }
}
