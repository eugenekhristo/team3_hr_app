import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiModule } from 'src/app/ui/ui.module';
import { SystemRoutingModule } from './system-routing.module';

import { InterviewService } from './shared/services/interview.service';

import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { InterviewListComponent } from './interview/presentationals/interview-list/interview-list.component';
import { AddInterviewDialogComponent } from './interview/containers/add-interview-dialog/add-interview-dialog.component';
import { InterviewCardComponent } from './interview/presentationals/interview-card/interview-card.component';


@NgModule({
  declarations: [SystemShellComponent, InterviewComponent, InterviewListComponent, AddInterviewDialogComponent, InterviewCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SystemRoutingModule,

  ],
  exports: [SystemShellComponent],
  providers: [InterviewService],
  entryComponents: [AddInterviewDialogComponent]
})
export class SystemPageModule {}
