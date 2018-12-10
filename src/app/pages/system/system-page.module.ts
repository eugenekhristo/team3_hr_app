import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiModule } from 'src/app/ui/ui.module';
import { SystemRoutingModule } from './system-routing.module';

import { InterviewService } from './shared/services/interview.service';

import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { InterviewListComponent } from './interview/presentationals/interview-list/interview-list.component';


@NgModule({
  declarations: [SystemShellComponent, InterviewComponent, InterviewListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SystemRoutingModule,

  ],
  exports: [SystemShellComponent],
  providers: [InterviewService]
})
export class SystemPageModule {}
