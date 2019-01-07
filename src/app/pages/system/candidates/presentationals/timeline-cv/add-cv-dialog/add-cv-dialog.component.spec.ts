import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvDialogComponent } from './add-cv-dialog.component';

describe('AddCvDialogComponent', () => {
  let component: AddCvDialogComponent;
  let fixture: ComponentFixture<AddCvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCvDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
