import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IUser, IUserInfo } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user$: Observable<IUser | null> | undefined;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

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

  updateUserInfo(userData: IUserInfo) {}
}
