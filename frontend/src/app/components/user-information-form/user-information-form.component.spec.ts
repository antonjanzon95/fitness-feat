import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationFormComponent } from './user-information-form.component';

describe('UserInformationFormComponent', () => {
  let component: UserInformationFormComponent;
  let fixture: ComponentFixture<UserInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInformationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
