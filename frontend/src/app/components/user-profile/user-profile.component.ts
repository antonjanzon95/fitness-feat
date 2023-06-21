import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user$: Observable<IUser | null> | undefined;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }
}
