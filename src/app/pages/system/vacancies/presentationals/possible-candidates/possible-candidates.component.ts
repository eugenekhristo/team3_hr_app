import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { PossibleCandidatesFilterService } from './possible-candidates-filter.service';
import { CandidateForVacancy } from 'src/app/core/models/vacancy.model';

@Component({
  selector: 'hr-possible-candidates',
  templateUrl: './possible-candidates.component.html',
  styleUrls: ['./possible-candidates.component.scss'],
  providers: [PossibleCandidatesFilterService]
})
export class PossibleCandidatesComponent implements OnInit {
  @Input() possibleCandidates$: Observable<Candidate[]>;

  @Output() goToCandidatePage = new EventEmitter<number>();

  pickedIds: number[] = [];
  pickedPossibleCandidates: CandidateForVacancy[] = [];

  constructor(
    public filterService: PossibleCandidatesFilterService,
    ) {}

  ngOnInit() {}

  onTogglePossibleCandidate(id: number) {
    // means unpick this candidate
    if (this.pickedIds.includes(id)) {
      this.pickedIds = this.pickedIds.filter(item => item !== id);
      this.pickedPossibleCandidates = this.pickedPossibleCandidates.filter(item => item.id !== id);
    } else {
      this.pickedIds.push(id);
      this.pickedPossibleCandidates.push(new CandidateForVacancy(id));
    }
  }
}
