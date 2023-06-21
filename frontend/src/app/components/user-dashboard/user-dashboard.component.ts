import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user$: Observable<IUser | null> | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  updateUser() {
    this.userService.getUser().subscribe({
      next: () => {
        console.log('test');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
