import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Candidate, CandidateClient} from '../../../../core/models/candidate.model';
import {InterviewClient} from '../../../../core/models/interview.model';
import {NewCandidateDialogService} from '../../../../ui/modules/new-candidate-dialog/new-candidate-dialog.service';
import {CandidateService} from '../../../../core/services/candidate.service';
import {SnackMessageService} from '../../../../ui/services/snack-messgae.service';

@Component({
  selector: 'hr-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {

  candidates$: Observable<Candidate[]>;

  constructor(private candidatesService: CandidateService,
              private candidateDialog: NewCandidateDialogService,
              private snackMessage: SnackMessageService) {
  }

  ngOnInit() {
    this.candidates$ = this.candidatesService.fetch();
  }

  onAddCandidate() {
    const candidateDialogRef = this.candidateDialog.open(
      new Candidate(null, null, null)
    );

    candidateDialogRef.afterClosed().subscribe((candidate: CandidateClient) => {
      if (candidate) {
        this.candidatesService
          .addCandidate(candidate)
          .subscribe((res: CandidateClient) => {
            this.candidatesService.newCandidateAdded$.next({
              ...candidate,
              id: res.id
            });
            this.snackMessage.openSnackBar(`An candidate event is added!`);
          });
      }
    });
  }
}
