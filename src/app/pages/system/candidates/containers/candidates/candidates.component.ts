import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Router } from '@angular/router';
import { FilterCandidatesService } from 'src/app/core/services/filter-candidates.service';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatDialog } from '@angular/material';
import { AddCandidateDialogComponent } from '../../presentationals/add-candidate-dialog/add-candidate-dialog.component';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';

@Component({
  selector: 'hr-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {
  toolbarMessage = '';
  private _destroyed$ = new Subject();

  constructor(
    public candidateStore: CandidatesStore,
    private router: Router,
    public filterService: FilterCandidatesService,
    private matSnack: SnackMessageService,
    private matDialog: MatDialog,
    private matConfirm: MatConfirmService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onAddCandidate(): void {
    const ref = this.matDialog.open(AddCandidateDialogComponent);
    ref.afterClosed().subscribe((res: { name: string; surname: string }) => {
      if (res) {
        const { name, surname } = res;
        const newCandidate = new Candidate(name, surname);
        this.candidateStore
          .addCandidate(newCandidate)
          .pipe(takeUntil(this._destroyed$))
          .subscribe(() =>
            this.openSnackAndCallBS('Candidate is successfully created! 🙌')
          );
      }
    });
  }

  onDeleteCandidate(id: number): void {
    this.matConfirm.open('Are you sure you wanna delete the candidate? 😲')
    .afterClosed()
    .subscribe((res: boolean) => {
      if (res) {
        this.candidateStore.deleteCandidate(id).pipe(takeUntil(this._destroyed$)).subscribe(
          () => this.openSnackAndCallBS('Candidate was successfully deleted! 💀')
        );
      }
    });
  }

  goToCandidatePage(id: number): void {
    this.candidateStore
      .bootstrapCandidate(id)
      .then(() => this.router.navigate(['/candidates', id]));
  }

  toggleToolbar() {
    this.filterService.isToolbarShown = !this.filterService.isToolbarShown;
    this.toolbarMessage = `${
      this.filterService.isToolbarShown ? 'Close' : 'Open'
    } toolbar`;
  }

  openSnackAndCallBS(msg: string): void {
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }
}
