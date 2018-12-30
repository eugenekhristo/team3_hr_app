import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {VacancyService} from '../../../vacancy.service';
import {Candidate} from '../../../../../../core/models/candidate.model';

@Component({
  selector: 'hr-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent {
  candidates: Array<Candidate> = [];
  @Output('add') addCandidate: EventEmitter<Candidate> = new EventEmitter<Candidate>();

  constructor(public dialogRef: MatDialogRef<AddCandidateComponent>, public service: VacancyService) {
    this.getCandidates();
  }

  close() {
    this.dialogRef.close();
  }

  add(candidate: Candidate) {
    candidate.id = new Date().getTime();

    this.service.addCandidate(candidate);
    this.dialogRef.close();
  }

  private getCandidates() {
    this.service.getCandidateList().subscribe((value: Candidate[]) => {
      this.candidates = value;
    });
  }
}
