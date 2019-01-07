import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CandidateDialogComponent } from './candidate-dialog/candidate-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [NgxMaterialTimepickerModule, CandidateDialogComponent],
  declarations: [CandidateDialogComponent]
})
export class CandidateDialogModule { }
