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

import {CandidateCardComponent} from './candidates/candidate-card/candidate-card.component';
import {CandidatePageComponent} from './candidates/candidate-page/candidate-page.component';
import {ShortInfoComponent} from './candidates/candidate-page/short-info/short-info.component';
import {TimelineComponent} from './candidates/candidate-page/timeline/timeline.component';
import {NewCvDialogComponent} from './candidates/candidate-page/timeline/new-cv-dialog/new-cv-dialog.component';
import {NewExperienceDialogComponent} from './candidates/candidate-page/timeline/new-experience-dialog/new-experience-dialog.component';
import {NewNotesDialogComponent} from './candidates/candidate-page/timeline/new-notes-dialog/new-notes-dialog.component';


@NgModule({

  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewListComponent,
    AddInterviewDialogComponent,
    InterviewCardComponent,
    VacancyListComponent,
    VacancyEditComponent,
    VacancyViewComponent,
    AddCandidateComponent,
    CandidateCardComponent,
    CandidatePageComponent,
    ShortInfoComponent,
    TimelineComponent,
    NewCvDialogComponent,
    NewExperienceDialogComponent,
    NewNotesDialogComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SystemRoutingModule,
    MaterialModule
  ],
  exports: [SystemShellComponent],
  providers: [InterviewService],
  entryComponents: [
    AddInterviewDialogComponent,
    NewExperienceDialogComponent,
    NewNotesDialogComponent,
    NewCvDialogComponent]

})
export class SystemPageModule {
}
