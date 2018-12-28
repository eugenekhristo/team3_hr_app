import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/ui/ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CandidatesComponent } from './containers/candidates/candidates.component';
import { CandiatesRoutingModule } from './candidates-routing.module';
import { CandidateComponent } from './containers/candidate/candidate.component';
import { ShortInfoComponent } from './presentationals/short-info/short-info.component';
import { EditContactsDialogComponent } from './presentationals/edit-contacts-dialog/edit-contacts-dialog.component';
import { TimelineComponent } from './presentationals/timeline/timeline.component';
import { TimelineNoteComponent } from './presentationals/timeline-note/timeline-note.component';
import { TimelineInterviewComponent } from './presentationals/timeline-interview/timeline-interview.component';
import { AddNoteDialogComponent } from './presentationals/timeline-note/add-note-dialog/add-note-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    CandiatesRoutingModule
  ],
  declarations: [
    CandidatesComponent,
    CandidateComponent,
    ShortInfoComponent,
    EditContactsDialogComponent,
    TimelineComponent,
    TimelineNoteComponent,
    TimelineInterviewComponent,
    AddNoteDialogComponent
  ],
  entryComponents: [EditContactsDialogComponent, AddNoteDialogComponent]
})
export class CandidatesModule {}
