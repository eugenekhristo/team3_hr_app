import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  @Input() candidates$: Observable<Candidate[]>;
  @Input() pickedIds: number[];
  @Input() shouldShowImage = true;
  @Input() shouldShowDeleteTooltip = true;
  @Input() styleForVacancy = false;

  @Output() goToCandidatePage = new EventEmitter<number>();
  @Output() deleteCandidate = new EventEmitter<number>();
  @Output() candidatesIdPicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  getIfTheCardChoosen(candidateId: number): boolean {
    if (this.pickedIds) {
      return this.pickedIds.includes(candidateId);
    }
  }

}
