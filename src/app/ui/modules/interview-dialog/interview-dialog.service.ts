import { MatDialog, MatDialogRef } from '@angular/material';
import { InterviewDialogComponent } from './interview-dialog/interview-dialog.component';
import { Injectable } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { INTERVIEW_DIALOG_TYPES } from './interview-dialog-types';

@Injectable()
export class InterviewDialogService {
  constructor(private matDialog: MatDialog) {}

  open(interview: InterviewClient, type: INTERVIEW_DIALOG_TYPES): MatDialogRef<any> {
    return this.matDialog.open(InterviewDialogComponent, {data: {interview, type}});
  }
}
