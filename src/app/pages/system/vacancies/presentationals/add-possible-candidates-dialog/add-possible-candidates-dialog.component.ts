import { Component, OnInit } from '@angular/core';
import { PossibleCandidatesFilterService } from '../possible-candidates/possible-candidates-filter.service';
import { CandidateForVacancy } from 'src/app/core/models/vacancy.model';

@Component({
  selector: 'hr-add-possible-candidates-dialog',
  templateUrl: './add-possible-candidates-dialog.component.html',
  styleUrls: ['./add-possible-candidates-dialog.component.scss'],
  providers: [PossibleCandidatesFilterService]
})
export class AddPossibleCandidatesDialogComponent implements OnInit {

  pickedIds: number[] = [];
  pickedPossibleCandidates: CandidateForVacancy[] = [];

  constructor(public filterService: PossibleCandidatesFilterService) { }

  ngOnInit() {
  }

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
