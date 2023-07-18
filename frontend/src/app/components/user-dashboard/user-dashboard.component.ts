import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { IUserInfo } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user/user.service';
import { IAppState } from 'src/app/state/app.state';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';
import { selectCurrentUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {}

  updateUserImage(url: string) {
    this.userService.updateUserImage(url).subscribe({
      next: () => {
        console.log('url: ', url);
        this.snackBar.open('Successfully changed svatar!', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to change avatar. Try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  tabChanged(selectedIndex: number) {
    if (selectedIndex == 0) {
      this.store.dispatch(ChallengeActions.resetCurrentChallenge());
    }
  }

  updateUserInfo(userData: IUserInfo) {}
}
