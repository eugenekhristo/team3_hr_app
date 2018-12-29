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

@NgModule({
  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewingComponent,
    QuestionnaireComponent
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
  providers: [InterviewService, InterviewStore],
  entryComponents: []
})
export class SystemPageModule {}
