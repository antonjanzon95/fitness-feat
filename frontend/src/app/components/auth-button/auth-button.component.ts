import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button
        (click)="
          auth.logout({ logoutParams: { returnTo: document.location.origin } })
        "
      >
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$
      .pipe(
        filter((isAuthenticated) => isAuthenticated),
        switchMap(() => this.auth.user$)
      )
      .subscribe((user) => {
        if (user && user.name && user.email && user.sub && user.picture) {
          this.store.dispatch(UserActions.login({ user }));
          // this.userService
          //   .addUser(user.name, user.email, user.sub, user.picture)
          //   .subscribe({
          //     next: (val) => {
          //       console.log(val);
          //     },
          //     error: (err) => {
          //       console.error(err);
          //     },
          //   });
        } else {
          this.store.dispatch(
            UserActions.loginFailure({ error: 'Login failed' })
          );
        }
      });
  }
}
