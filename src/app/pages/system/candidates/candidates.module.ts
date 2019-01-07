import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/ui/ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

import { CandidatesComponent } from './containers/candidates/candidates.component';
import { CandiatesRoutingModule } from './candidates-routing.module';
import { CandidateComponent } from './containers/candidate/candidate.component';
import { ShortInfoComponent } from './presentationals/short-info/short-info.component';
import { EditContactsDialogComponent } from './presentationals/edit-contacts-dialog/edit-contacts-dialog.component';
import { TimelineComponent } from './presentationals/timeline/timeline.component';
import { TimelineNoteComponent } from './presentationals/timeline-note/timeline-note.component';
import { TimelineInterviewComponent } from './presentationals/timeline-interview/timeline-interview.component';
import { AddNoteDialogComponent } from './presentationals/timeline-note/add-note-dialog/add-note-dialog.component';
import { TimelineFeedbackComponent } from './presentationals/timeline-feedback/timeline-feedback.component';
import { FeedbackEditDialogComponent } from './presentationals/timeline-feedback/feedback-edit-dialog/feedback-edit-dialog.component';
import { TimelineCvComponent } from './presentationals/timeline-cv/timeline-cv.component';
import { AddCvDialogComponent } from './presentationals/timeline-cv/add-cv-dialog/add-cv-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    CandiatesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    CandidatesComponent,
    CandidateComponent,
    ShortInfoComponent,
    EditContactsDialogComponent,
    TimelineComponent,
    TimelineNoteComponent,
    TimelineInterviewComponent,
    AddNoteDialogComponent,
    TimelineFeedbackComponent,
    FeedbackEditDialogComponent,
    TimelineCvComponent,
    AddCvDialogComponent
  ],
  entryComponents: [
    EditContactsDialogComponent,
    AddNoteDialogComponent,
    FeedbackEditDialogComponent,
    AddCvDialogComponent
  ]
})
export class CandidatesModule {}
