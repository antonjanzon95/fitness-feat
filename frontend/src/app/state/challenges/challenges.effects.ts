import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChallengeService } from 'src/app/services/challenge/challenge.service';
import { WeightEntryService } from 'src/app/services/weight-entry/weight-entry.service';
import { ChallengeActions } from './challenges.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ChallengesEffects {
  getChallenges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getChallenges),
      concatMap(() => {
        return this.challengeService.getChallenges().pipe(
          map((response) => ({
            challenges: response,
            type: ChallengeActions.getChallengesSuccess.type,
          })),
          catchError((error: HttpErrorResponse) =>
            of(
              ChallengeActions.getChallengesFailure({
                error: error.error.message,
              })
            )
          )
        );
      })
    )
  );

  getCurrentChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getCurrentChallenge),
      concatMap(({ challengeId }) => {
        return this.challengeService.getCurrentChallenge(challengeId).pipe(
          map((response) =>
            ChallengeActions.getCurrentChallengeSuccess({ challenge: response })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ChallengeActions.getCurrentChallengeFailure({
                error: error.error.message,
              })
            )
          )
        );
      })
    )
  );

  getCurrentChallengeWeightEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getCurrentChallengeWeightEntries),
      concatMap(({ challengeId }) => {
        return this.weightEntryService
          .getChallengeWeightEntries(challengeId)
          .pipe(
            map((response) =>
              ChallengeActions.getCurrentChallengeWeightEntriesSuccess({
                entries: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ChallengeActions.getCurrentChallengeWeightEntriesFailure({
                  error: error.error.message,
                })
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private challengeService: ChallengeService,
    private weightEntryService: WeightEntryService
  ) {}
}
