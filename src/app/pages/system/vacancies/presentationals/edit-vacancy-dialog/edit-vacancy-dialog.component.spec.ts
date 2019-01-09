import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacancyDialogComponent } from './edit-vacancy-dialog.component';

describe('EditVacancyDialogComponent', () => {
  let component: EditVacancyDialogComponent;
  let fixture: ComponentFixture<EditVacancyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVacancyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
