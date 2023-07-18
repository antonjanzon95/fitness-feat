import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import {
  selectAllChallenges,
  selectCurrentChallenge,
} from 'src/app/state/challenges/challenger.selector';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  challenges$ = this.store.select(selectAllChallenges);
  currentChallenge$ = this.store.select(selectCurrentChallenge);

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ChallengeActions.getChallenges());
  }

  setCurrentChallenge(challengeId: string): void {
    this.store.dispatch(ChallengeActions.getCurrentChallenge({ challengeId }));
  }
}
