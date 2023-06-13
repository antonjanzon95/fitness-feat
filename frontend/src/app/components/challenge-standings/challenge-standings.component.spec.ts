import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeStandingsComponent } from './challenge-standings.component';

describe('ChallengeStandingsComponent', () => {
  let component: ChallengeStandingsComponent;
  let fixture: ComponentFixture<ChallengeStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeStandingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
