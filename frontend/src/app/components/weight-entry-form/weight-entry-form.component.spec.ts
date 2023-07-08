import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightEntryFormComponent } from './weight-entry-form.component';

describe('WeightEntryFormComponent', () => {
  let component: WeightEntryFormComponent;
  let fixture: ComponentFixture<WeightEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightEntryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
