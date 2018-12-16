import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCvDialogComponent } from './new-cv-dialog.component';

describe('NewCvDialogComponent', () => {
  let component: NewCvDialogComponent;
  let fixture: ComponentFixture<NewCvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCvDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
