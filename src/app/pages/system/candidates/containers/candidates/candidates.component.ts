import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../../../core/services/candidate.service';
import {Candidate, TimelineNote} from '../../../../../core/models/candidate.model';
import { Observable } from 'rxjs';
import {MatConfirmService} from '../../../../../ui/modules/reusable-mat-confirm/mat-confirm-service';
import {Router} from '@angular/router';
import {AddCandidateDialogComponent} from '../../presentationals/add-candidate-dialog/add-candidate-dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'hr-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  candidates$: Observable<Candidate[]>;

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private confirm: MatConfirmService,
    private matDialog: MatDialog
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
    const candidateDialogRef = this.matDialog.open(AddCandidateDialogComponent);
    candidateDialogRef.afterClosed().subscribe();
  }
}
