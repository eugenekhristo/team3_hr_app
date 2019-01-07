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

@NgModule({
  declarations: [
    SystemShellComponent,
    InterviewComponent,
    InterviewingComponent,
    CandidateAssetsInterComponent,
    InterAssetsCvComponent,
    InterAssetsNoteComponent,
    ReadNoteDialogComponent
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
  entryComponents: [ReadNoteDialogComponent]
})
export class SystemPageModule {}
