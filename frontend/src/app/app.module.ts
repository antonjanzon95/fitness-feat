import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-fjqmm0320zqke6su.us.auth0.com',
      clientId: 'sfTvviOKbi0IO3ra3KXWu29BLqeNIlXJ',
      authorizationParams: {
        audience: 'http://fitnessfeatsweden.com',
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
