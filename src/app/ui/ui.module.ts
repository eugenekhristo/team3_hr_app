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
import { PasteProfileImgDirective } from './directives/paste_profile_img.directive';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CandidateDialogModule } from './modules/candidate-dialog/candidate-dialog.module';
import { CandidateDialogService } from './modules/candidate-dialog/candidate-dialog.service';
import { CandidateDialogComponent } from './modules/candidate-dialog/candidate-dialog/candidate-dialog.component';
import { AnimatedReadingComponent } from './components/animated-reading/animated-reading.component';


@NgModule({
  declarations: [
    SnackMessageComponent,
    PasteProfileImgDirective,
    QuestionnaireComponent,
    AnimatedReadingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReusableMatConfirmModule,
    InterviewDialogModule,
    CandidateDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SnackMessagePbService,
    SnackMessageService,
    InterviewDialogService,
    CandidateDialogService
  ],
  entryComponents: [SnackMessageComponent, InterviewDialogComponent, CandidateDialogComponent],
  exports: [
    MaterialModule,
    ReusableMatConfirmModule,
    FlexLayoutModule,
    InterviewDialogModule,
    CandidateDialogModule,
    PasteProfileImgDirective,
    QuestionnaireComponent,
    AnimatedReadingComponent
  ]
})
export class UiModule {}
