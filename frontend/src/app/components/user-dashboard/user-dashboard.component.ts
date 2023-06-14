import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: IUser | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (val) => {
        console.log(val);
        this.user = val;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
