import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../core/services/user.service';
import { AuthService } from './services/auth.service';
import { AuthPageModule } from '../pages/auth/auth-page.module';
import { CandidateService } from './services/candidate.service';
import { VacancyService } from './services/vacancy.service';
import { CandidatesStore } from './services/candidate-store.service';
import { VacancyStore } from './services/vacancy-store.service';
import { FilterVacanciesService } from './services/filter-vacancies.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthPageModule],
  exports: [FormsModule, ReactiveFormsModule, AuthPageModule],
  providers: [
    UserService,
    AuthService,
    CandidateService,
    CandidatesStore,
    VacancyService,
    VacancyStore,
    FilterVacanciesService
  ]
})
export class CoreModule {}
