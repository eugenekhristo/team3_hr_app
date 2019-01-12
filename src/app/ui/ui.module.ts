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
import { ReactiveFormsModule } from '@angular/forms';
import { AnimatedReadingComponent } from './components/animated-reading/animated-reading.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { PreferredContactIconComponent } from './components/preferred-contact-icon/preferred-contact-icon.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { CandidateContactsComponent } from './components/candidate-contacts/candidate-contacts.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { SmartGoBackBtnComponent } from './components/smart-go-back-btn/smart-go-back-btn.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SnackMessageComponent,
    PasteProfileImgDirective,
    QuestionnaireComponent,
    AnimatedReadingComponent,
    SmallCardComponent,
    PreferredContactIconComponent,
    CandidatesListComponent,
    CandidateCardComponent,
    CandidateContactsComponent,
    SmartGoBackBtnComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReusableMatConfirmModule,
    InterviewDialogModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule
  ],
  providers: [
    SnackMessagePbService,
    SnackMessageService,
    InterviewDialogService
  ],
  entryComponents: [SnackMessageComponent, InterviewDialogComponent],
  exports: [
    MaterialModule,
    ReusableMatConfirmModule,
    FlexLayoutModule,
    InterviewDialogModule,
    PasteProfileImgDirective,
    QuestionnaireComponent,
    AnimatedReadingComponent,
    SmallCardComponent,
    PreferredContactIconComponent,
    CandidatesListComponent,
    CandidateCardComponent,
    CandidateContactsComponent,
    SmartGoBackBtnComponent
  ]
})
export class UiModule {}
