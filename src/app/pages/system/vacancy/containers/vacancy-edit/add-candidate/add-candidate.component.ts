import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {VacancyService} from '../../../vacancy.service';

export interface Candidate {
  id: number;
  name: string;
  surname: string;
  position: string;
  salary: Salary;
}

export interface Salary {
  count: number;
  type: string;
}

@Component({
  selector: 'hr-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent {
  candidates: Array<Candidate> = this.service.newCandidateList;
  @Output('add') addCandidate: EventEmitter<Candidate> = new EventEmitter<Candidate>();

  constructor(public dialogRef: MatDialogRef<AddCandidateComponent>, public service: VacancyService) {
  }

  close() {
    this.dialogRef.close();
  }

  add(candidate: Candidate, i: number) {
    // working with service. LOOOK AND ENJOY
    this.service.candidateList.push(...this.service.newCandidateList.splice(i, 1));
    this.dialogRef.close();
  }

}
