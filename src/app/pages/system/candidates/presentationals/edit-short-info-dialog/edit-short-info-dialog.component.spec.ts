import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShortInfoDialogComponent } from './edit-short-info-dialog.component';

describe('EditShortInfoDialogComponent', () => {
  let component: EditShortInfoDialogComponent;
  let fixture: ComponentFixture<EditShortInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShortInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShortInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
