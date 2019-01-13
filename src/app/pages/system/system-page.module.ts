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
import { CandidateAssetsInterComponent } from './interview/presentationals/candidate-assets-inter/candidate-assets-inter.component';
import { InterAssetsCvComponent } from './interview/presentationals/inter-assets-cv/inter-assets-cv.component';
import { InterAssetsNoteComponent } from './interview/presentationals/inter-assets-note/inter-assets-note.component';
import { ReadNoteDialogComponent } from './interview/presentationals/inter-assets-note/read-note-dialog/read-note-dialog.component';
import { InterAssetsFeedbackComponent } from './interview/presentationals/inter-assets-feedback/inter-assets-feedback.component';
import { ReadFeedbackDialogComponent } from './interview/presentationals/inter-assets-feedback/read-feedback-dialog/read-feedback-dialog.component';

@NgModule({
  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewingComponent,
    CandidateAssetsInterComponent,
    InterAssetsCvComponent,
    InterAssetsNoteComponent,
    ReadNoteDialogComponent,
    InterAssetsFeedbackComponent,
    ReadFeedbackDialogComponent
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
  entryComponents: [ReadNoteDialogComponent, ReadFeedbackDialogComponent]
})
export class SystemPageModule {}
