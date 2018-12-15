import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class MatConfirmService {
  constructor(private matDialog: MatDialog) {}

  open(message: string): MatDialogRef<DialogComponent, any> {
    return this.matDialog.open(DialogComponent, {
      data: message
    });
  }
}
