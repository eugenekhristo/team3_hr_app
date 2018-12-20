import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { SnackMessageComponent } from './components/snack-message/snack-message.component';

import { SnackMessagePbService } from './services/snack-message-pb.service';
import { SnackMessageService } from './services/snack-messgae.service';
import { ReusableMatConfirmModule } from './modules/reusable-mat-confirm/reusable-mat-confirm.module';
import { InterviewDialogModule } from './modules/interview-dialog/interview-dialog.module';
import { InterviewDialogComponent } from './modules/interview-dialog/interview-dialog/interview-dialog.component';
import { InterviewDialogService } from './modules/interview-dialog/interview-dialog.service';
import { NewCandidateDialogComponent } from './modules/new-candidate-dialog/new-candidate-dialog/new-candidate-dialog.component';
import { NewCandidateDialogModule } from './modules/new-candidate-dialog/new-candidate-dialog.module';
import { NewCandidateDialogService } from './modules/new-candidate-dialog/new-candidate-dialog.service';

@NgModule({
  declarations: [SnackMessageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReusableMatConfirmModule,
    InterviewDialogModule,
    NewCandidateDialogModule
  ],
  providers: [
    SnackMessagePbService,
    SnackMessageService,
    InterviewDialogService,
    NewCandidateDialogService
  ],
  entryComponents: [
    SnackMessageComponent,
    InterviewDialogComponent,
    NewCandidateDialogComponent
  ],
  exports: [
    MaterialModule,
    ReusableMatConfirmModule,
    FlexLayoutModule,
    InterviewDialogModule,
    NewCandidateDialogModule
  ]
})
export class UiModule {}
