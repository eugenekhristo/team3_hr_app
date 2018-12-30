import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiModule } from 'src/app/ui/ui.module';
import { SystemRoutingModule } from './system-routing.module';

import { InterviewService } from './shared/services/interview.service';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { FullCalendarModule } from 'ng-fullcalendar';


import { InterviewingComponent } from './interview/containers/interviewing/interviewing.component';
import { InterviewStore } from './shared/services/interview-store.service';
import { QuestionnaireComponent } from './interview/presentationals/questionnaire/questionnaire.component';

import { VacancyListComponent } from './vacancy/containers/vacancy-list/vacancy-list.component';
import { VacancyEditComponent } from './vacancy/containers/vacancy-edit/vacancy-edit.component';
import { VacancyViewComponent } from './vacancy/containers/vacancy-view/vacancy-view.component';
import { AddCandidateComponent } from './vacancy/containers/vacancy-edit/add-candidate/add-candidate.component';
import { AddSkillComponent } from './vacancy/containers/vacancy-edit/add-skill/add-skill.component';
import { VacancyService } from './vacancy/vacancy.service';

@NgModule({
  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewingComponent,
    QuestionnaireComponent,
    VacancyListComponent,
    VacancyEditComponent,
    VacancyViewComponent,
    AddCandidateComponent,
    AddSkillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SystemRoutingModule,
    FullCalendarModule
  ],
  exports: [SystemShellComponent],
  providers: [InterviewService, InterviewStore, VacancyService],
  entryComponents: [
    AddSkillComponent,
    AddCandidateComponent]
})
export class SystemPageModule {}
