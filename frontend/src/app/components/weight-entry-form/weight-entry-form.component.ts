import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { selectCurrentChallenge } from 'src/app/state/challenges/challenger.selector';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-weight-entry-form',
  templateUrl: './weight-entry-form.component.html',
  styleUrls: ['./weight-entry-form.component.css'],
})
export class WeightEntryFormComponent implements OnInit, OnDestroy {
  weightEntryForm: FormGroup;
  currentChallenge$ = this.store.select(selectCurrentChallenge);
  challengeSubscription: Subscription | undefined;
  challengeId: string | undefined;

  constructor(
    private store: Store<IAppState>,
    private formbuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<WeightEntryFormComponent>
  ) {
    this.weightEntryForm = this.formbuilder.group({
      weight: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.challengeSubscription = this.currentChallenge$.subscribe((res) => {
      this.challengeId = res?._id;
    });
  }

  ngOnDestroy(): void {
    this.challengeSubscription?.unsubscribe();
  }

  onSubmit() {
    if (this.weightEntryForm.invalid) return;

    if (this.currentChallenge$) {
      if (!this.challengeId) return;
      this.store.dispatch(
        UserActions.newChallengeWeightEntry({
          weight: this.weightEntryForm.value.weight,
          challengeId: this.challengeId,
        })
      );
    }
    this.store.dispatch(
      UserActions.newWeightEntry({
        weight: this.weightEntryForm.value.weight,
      })
    );
    this.weightEntryForm.reset();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
