import {MatDialog, MatDialogRef} from '@angular/material';
import {NewCandidateDialogComponent} from './new-candidate-dialog/new-candidate-dialog.component';
import {Injectable} from '@angular/core';
import {CandidateClient} from '../../../core/models/candidate.model';

@Injectable()
export class NewCandidateDialogService {
  constructor(private matDialog: MatDialog) {
  }

  open(candidate: CandidateClient): MatDialogRef<any> {
    return this.matDialog.open(NewCandidateDialogComponent, {data: {candidate}});
  }
}
