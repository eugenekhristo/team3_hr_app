import { Component, OnInit } from '@angular/core';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { InterviewService } from '../../../shared/services/interview.service';

@Component({
  selector: 'hr-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
  providers: [CandidatesStore]
})
export class CandidateComponent implements OnInit {
  constructor(
    public candidateStore: CandidatesStore,
    private mastSnack: SnackMessageService,
    // FIXME: delete this service jsut for testing
    private candidateService: CandidateService,
  ) {}

  ngOnInit() {

  }

  onCandidateChanged(candidate: Candidate): void {
    this.candidateStore
      .updateCandidate(candidate)
      .subscribe(() => this.mastSnack.openSnackBar('Candidate is updated!'));
  }
}
