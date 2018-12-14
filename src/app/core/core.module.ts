import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from '../core/services/user.service';
import { AuthService } from './services/auth.service';
import { AuthPageModule } from '../pages/auth/auth-page.module';
import { CandidateService } from './services/candidate.service';
import { VacancyService } from './services/vacancy.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthPageModule
  ],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, AuthPageModule],
  providers: [UserService, AuthService, CandidateService, VacancyService]
})
export class CoreModule {}
