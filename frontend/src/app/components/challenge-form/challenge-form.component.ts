import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChallengeService } from 'src/app/services/challenge/challenge.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css'],
})
export class ChallengeFormComponent {
  challengeForm: FormGroup;
  successMsg: string = 'You have successfully added your challenge!';
  failedMsg: string = 'Failed to add challenge, please try again.';

  @ViewChild('form') form: any;

  constructor(
    private formbuilder: FormBuilder,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar
  ) {
    this.challengeForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      visibility: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.challengeForm.invalid) return;

    const challengeData = {
      name: this.challengeForm.value.name,
      description: this.challengeForm.value.description,
      visibility: this.challengeForm.value.visibility,
      startDate: this.challengeForm.value.startDate,
      endDate: this.challengeForm.value.endDate,
    };

    this.challengeService
      .addChallenge(
        challengeData.name,
        challengeData.description,
        challengeData.visibility,
        challengeData.startDate,
        challengeData.endDate
      )
      .subscribe({
        next: (val) => {
          console.log(val);
          this.form.resetForm();
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
