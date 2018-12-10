import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemShellComponent } from './system-shell.component';

describe('SystemShellComponent', () => {
  let component: SystemShellComponent;
  let fixture: ComponentFixture<SystemShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
