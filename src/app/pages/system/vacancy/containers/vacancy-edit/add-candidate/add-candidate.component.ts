import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface Candidates {
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
export class AddCandidateComponent implements OnInit {
  @Output('close')
  closeEmitter: EventEmitter<null> = new EventEmitter();
  candidate: Candidates = {
    id: 0,
    name: 'Sam',
    surname: 'Scarlett ',
    position: 'Front-end developer',
    salary: {
      count: 600,
      type: '$',
    }
  };
  @Output('add') addCandidate: EventEmitter<Candidates> = new EventEmitter<Candidates>();

  constructor() { }

  ngOnInit() {
  }
  close() {
    this.closeEmitter.emit();
  }

  add() {
    this.addCandidate.emit(this.candidate);
  }

}
