import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedReadingComponent } from './animated-reading.component';

describe('AnimatedReadingComponent', () => {
  let component: AnimatedReadingComponent;
  let fixture: ComponentFixture<AnimatedReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
