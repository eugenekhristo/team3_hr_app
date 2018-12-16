import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UiModule} from 'src/app/ui/ui.module';
import {SystemRoutingModule} from './system-routing.module';

import {InterviewService} from './shared/services/interview.service';

import {SystemShellComponent} from './system-shell/system-shell.component';
import {InterviewComponent} from './interview/containers/interview/interview.component';
import {InterviewListComponent} from './interview/presentationals/interview-list/interview-list.component';
import {InterviewCardComponent} from './interview/presentationals/interview-card/interview-card.component';
import {VacancyListComponent} from './vacancy/containers/vacancy-list/vacancy-list.component';
import {VacancyEditComponent} from './vacancy/containers/vacancy-edit/vacancy-edit.component';
import {VacancyViewComponent} from './vacancy/containers/vacancy-view/vacancy-view.component';
import {AddCandidateComponent} from './vacancy/containers/vacancy-edit/add-candidate/add-candidate.component';
import {MaterialModule} from '../../ui/material/material.module';


@NgModule({
  declarations: [SystemShellComponent, InterviewComponent,
    InterviewListComponent, InterviewCardComponent,
    VacancyListComponent, VacancyEditComponent, VacancyViewComponent, AddCandidateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SystemRoutingModule,
    MaterialModule
  ],
  exports: [SystemShellComponent],
  providers: [InterviewService]
})
export class SystemPageModule {
}
