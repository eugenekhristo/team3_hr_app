import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiModule } from 'src/app/ui/ui.module';
import { SystemRoutingModule } from './system-routing.module';

import { InterviewService } from './shared/services/interview.service';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { InterviewListComponent } from './interview/presentationals/interview-list/interview-list.component';
import { InterviewCardComponent } from './interview/presentationals/interview-card/interview-card.component';
import { FullCalendarModule } from 'ng-fullcalendar';


import { InterviewingComponent } from './interview/containers/interviewing/interviewing.component';
import { InterviewStore } from './shared/services/interview-store.service';

@NgModule({
  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewListComponent,
    InterviewCardComponent,
    InterviewingComponent
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
