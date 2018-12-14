import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyEditComponent } from './vacancy-edit.component';

describe('VacancyEditComponent', () => {
  let component: VacancyEditComponent;
  let fixture: ComponentFixture<VacancyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
