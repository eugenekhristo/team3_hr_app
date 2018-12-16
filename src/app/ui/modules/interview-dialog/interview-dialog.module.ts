import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewDialogComponent } from './interview-dialog/interview-dialog.component';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  exports: [NgxMaterialTimepickerModule, InterviewDialogComponent],
  declarations: [InterviewDialogComponent]
})
export class InterviewDialogModule { }
