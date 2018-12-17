import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCandidateDialogComponent } from './new-candidate-dialog/new-candidate-dialog.component';
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
  exports: [NgxMaterialTimepickerModule, NewCandidateDialogComponent],
  declarations: [NewCandidateDialogComponent]
})
export class NewCandidateDialogModule { }
