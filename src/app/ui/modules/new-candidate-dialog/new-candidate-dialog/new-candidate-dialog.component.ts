import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {CandidateClient} from '../../../../core/models/candidate.model';

@Component({
  selector: 'hr-new-candidate-dialog',
  templateUrl: './new-candidate-dialog.component.html',
  styleUrls: ['./new-candidate-dialog.component.scss']
})
export class NewCandidateDialogComponent implements OnInit {
  name: string;
  surname: string;
  position: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { candidate: CandidateClient }
  ) {
  }

  ngOnInit() {
  }

}
