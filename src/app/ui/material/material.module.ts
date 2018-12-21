import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
