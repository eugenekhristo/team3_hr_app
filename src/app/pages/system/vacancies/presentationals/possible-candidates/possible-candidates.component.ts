import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-possible-candidates',
  templateUrl: './possible-candidates.component.html',
  styleUrls: ['./possible-candidates.component.scss']
})
export class PossibleCandidatesComponent implements OnInit {
  @Input() possibleCandidates$: Observable<Candidate[]>;
  @Output() goToCandidatePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
