import { Component, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-weight-entry-form',
  templateUrl: './weight-entry-form.component.html',
  styleUrls: ['./weight-entry-form.component.css'],
})
export class WeightEntryFormComponent {
  weightEntryForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private formbuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<WeightEntryFormComponent>
  ) {
    this.weightEntryForm = this.formbuilder.group({
      weight: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.weightEntryForm.invalid) return;

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
