import { Component, OnInit } from '@angular/core';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Router } from '@angular/router';
import { FilterCandidatesService } from 'src/app/core/services/filter-candidates.service';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';

@Component({
  selector: 'hr-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  toolbarMessage = '';

  constructor(
    public candidateStore: CandidatesStore,
    private router: Router,
    public filterService: FilterCandidatesService,
    private matSnack: SnackMessageService
    ) { }

  ngOnInit() {
  }

  goToCandidatePage(id: number): void {
    this.candidateStore
      .bootstrapCandidate(id)
      .then(() => this.router.navigate(['/candidates', id]));
  }

  toggleToolbar() {
    this.filterService.isToolbarShown = !this.filterService.isToolbarShown;
    this.toolbarMessage = `${this.filterService.isToolbarShown ? 'Close' : 'Open'} toolbar`;
  }

  openSnackAndCallBS(msg: string): void {
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }
}
