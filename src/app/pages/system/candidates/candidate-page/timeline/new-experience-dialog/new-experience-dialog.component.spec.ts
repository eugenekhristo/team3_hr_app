import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExperienceDialogComponent } from './new-experience-dialog.component';

describe('NewExperienceDialogComponent', () => {
  let component: NewExperienceDialogComponent;
  let fixture: ComponentFixture<NewExperienceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
