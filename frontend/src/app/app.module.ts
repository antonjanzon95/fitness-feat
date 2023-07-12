import { NgModule, isDevMode } from '@angular/core';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengesTableComponent } from './components/challenges-table/challenges-table.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ChallengeStandingsComponent } from './components/challenge-standings/challenge-standings.component';
import { environment } from 'src/environments/environment.development';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { UserInformationFormComponent } from './components/user-information-form/user-information-form.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './state/user/user.effects';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { workoutsReducer } from './state/workouts/workouts.reducer';
import { WorkoutEffects } from './state/workouts/workouts.effects';
import { WeightEntryFormComponent } from './components/weight-entry-form/weight-entry-form.component';
import { MinsToHoursPipe } from './pipes/mins-to-hours.pipe';
import { WeightPipe } from './pipes/weight.pipe';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { WeightChartComponent } from './components/weight-chart/weight-chart.component';

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
    UserDashboardComponent,
    ChallengeComponent,
    ChallengesTableComponent,
    ChallengesComponent,
    ChallengeStandingsComponent,
    UserInformationFormComponent,
    WorkoutsComponent,
    WeightEntryFormComponent,
    MinsToHoursPipe,
    WeightPipe,
    WeightChartComponent,
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
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    NgChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    MatGridListModule,
    LayoutModule,
    StoreModule.forRoot({ user: userReducer, workouts: workoutsReducer }, {}),
    EffectsModule.forRoot([UserEffects, WorkoutEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
