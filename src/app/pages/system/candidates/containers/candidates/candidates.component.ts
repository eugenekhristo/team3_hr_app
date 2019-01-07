import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../../../core/services/candidate.service';
import {Candidate, CONTACT_TYPES} from '../../../../../core/models/candidate.model';
import { Observable } from 'rxjs';
import { MatConfirmService } from '../../../../../ui/modules/reusable-mat-confirm/mat-confirm-service';
import { Router } from '@angular/router';
import { CandidateDialogService } from '../../../../../ui/modules/candidate-dialog/candidate-dialog.service';
import { SnackMessageService } from '../../../../../ui/services/snack-messgae.service';


@Component({
  selector: 'hr-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  candidates$: Observable<Candidate[]>;
  imgSrc: string = 'http://hokido.ru/wp-content/uploads/2013/04/yQAvow-C-w.jpg';

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private candidateDialog: CandidateDialogService,
    private confirm: MatConfirmService,
    private snackMessage: SnackMessageService
  ) { }

  ngOnInit() {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.candidateService.getAllCandidates().subscribe(candidates => {
      this.candidates = candidates;
    });
  }

  onDeleteCandidate(candidateId: number) {
    const confirmRef = this.confirm.open(
      'Are you really wanna delete this candidate? 😱'
    );
    confirmRef.afterClosed().subscribe(res => {
      if (res) {
        this.candidateService
          .deleteCandidate(candidateId)
          .subscribe(() => {
            this.router.navigate(['candidate'], {
              queryParams: {
                event: 'candidateDeleted'
              }
            });
          });
      }
    });
  }

  onAddCandidate() {
    const candidateDialogRef = this.candidateDialog.open(
      new Candidate(null, null, this.imgSrc, null, [], [])
    );
    candidateDialogRef.afterClosed().subscribe( (candidate: Candidate) => {
      if (candidate) {
        console.log(candidate);
        this.candidateService
          .addCandidate(candidate)
          .subscribe((res: Candidate) => {
            this.candidateService.newCandidateAdded$.next({
              ...candidate,
              id: res.id
            });
            this.snackMessage.openSnackBar(`An candidate event is added!`);
          });
      }
    });
  }
}
