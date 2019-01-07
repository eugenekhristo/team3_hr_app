import { MatDialog, MatDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';
import {Candidate} from '../../../core/models/candidate.model';
import {CandidateDialogComponent} from './candidate-dialog/candidate-dialog.component';

@Injectable()
export class CandidateDialogService {
  constructor(private matDialog: MatDialog) {}

  open(candidate: Candidate): MatDialogRef<any> {
    return this.matDialog.open(CandidateDialogComponent, {data: {candidate}});
  }
}
