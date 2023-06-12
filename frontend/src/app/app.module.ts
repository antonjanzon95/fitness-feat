import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './views/about/about.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { ContactComponent } from './views/contact/contact.component';
import { HomeComponent } from './views/home/home.component';
import { ChallengeFormComponent } from './components/challenge-form/challenge-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AuthButtonComponent,
    UserProfileComponent,
    HeroComponent,
    WorkoutFormComponent,
    ChallengeFormComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-fjqmm0320zqke6su.us.auth0.com',
      clientId: 'sfTvviOKbi0IO3ra3KXWu29BLqeNIlXJ',
      authorizationParams: {
        audience: 'http://fitnessfeatsweden.com',
        redirect_uri: window.location.origin,
      },
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
