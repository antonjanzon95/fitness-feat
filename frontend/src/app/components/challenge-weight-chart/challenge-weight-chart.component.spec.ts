import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeWeightChartComponent } from './challenge-weight-chart.component';

describe('ChallengeWeightChartComponent', () => {
  let component: ChallengeWeightChartComponent;
  let fixture: ComponentFixture<ChallengeWeightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeWeightChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeWeightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
