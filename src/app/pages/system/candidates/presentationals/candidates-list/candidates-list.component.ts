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
  @Output() goToCandidatePage = new EventEmitter<number>();
  @Output() deleteCandidate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
