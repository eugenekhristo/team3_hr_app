import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

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
    FullCalendarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [SystemShellComponent],
  providers: [InterviewService, InterviewStore],
  entryComponents: []
})
export class SystemPageModule {}
