import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CandidateService} from '../../../../../core/services/candidate.service';
import {Candidate} from '../../../../../core/models/candidate.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'hr-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  @Output() outputOnSearch: EventEmitter<string> = new EventEmitter();

  candidates: Candidate[] = [];
  candidates$: Observable<Candidate[]>;

  constructor(
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.candidateService.getAllCandidates().subscribe(candidates => {
      this.candidates = candidates;
    });
  }

}
