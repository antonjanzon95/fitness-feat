import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user/user.service';
import { IAppState } from 'src/app/state/app.state';
import { selectCurrentUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  constructor(
    private store: Store<IAppState>,
    public userService: UserService
  ) {}

  ngOnInit(): void {}
}
