import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactsDialogComponent } from './edit-contacts-dialog.component';

describe('EditContactsDialogComponent', () => {
  let component: EditContactsDialogComponent;
  let fixture: ComponentFixture<EditContactsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
