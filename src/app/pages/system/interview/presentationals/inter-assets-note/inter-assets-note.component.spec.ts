import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAssetsNoteComponent } from './inter-assets-note.component';

describe('InterAssetsNoteComponent', () => {
  let component: InterAssetsNoteComponent;
  let fixture: ComponentFixture<InterAssetsNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterAssetsNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterAssetsNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
