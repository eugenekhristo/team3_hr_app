import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Observable } from 'rxjs';
import {
  Vacancy,
  VACANCY_STATUS,
  Requirement
} from 'src/app/core/models/vacancy.model';
import { Candidate } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatDialog } from '@angular/material';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { EditVacancyDialogComponent } from '../../presentationals/edit-vacancy-dialog/edit-vacancy-dialog.component';
import { FilterVacanciesService } from 'src/app/core/services/filter-vacancies.service';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';

@Component({
  selector: 'hr-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  vacancy: Vacancy;
  possibleCandidates$: Observable<Candidate[]>;

  reqPub: Requirement[] = [];
  reqPriv: Requirement[] = [];
  notReqPub: Requirement[] = [];
  notReqPriv: Requirement[] = [];

  constructor(
    private route: ActivatedRoute,
    private vacancyStore: VacancyStore,
    private matDialog: MatDialog,
    private matSnack: SnackMessageService,
    private matConfirm: MatConfirmService,
    private router: Router,
    public filterService: FilterVacanciesService,
    private candidateStore: CandidatesStore
  ) {}

  ngOnInit() {
    // TODO: two subscriptions - UBSIBSCRIBE!!!!
    this.vacancyStore
      .bootstrapVacancy(this.route.snapshot.params['id'])
      .subscribe(() => {
        this.vacancyStore.vacancy$.subscribe(vacancy => {
          this.vacancy = vacancy;
          this.createRequirementsArrForRendering();
        });
        this.possibleCandidates$ = this.vacancyStore.possibleCandidates$;
      });
  }

  onDeleteVacancy(id: number): void {
    this.matConfirm
      .open('Are you sure you wanna delete this vacancy? 😱')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.vacancyStore.deleteVacancy(id).subscribe(() => {
            this.router.navigate(['/vacancies'], {
              queryParams: {
                isDeleted: true
              }
            });
          });
        }
      });
  }

  onEditVacancy(vacancy: Vacancy): void {
    const ref = this.matDialog.open(EditVacancyDialogComponent, {
      data: vacancy
    });

    ref.afterClosed().subscribe(res => {
      if (res) {
        const updatedVacancy = { ...vacancy, ...res };
        this.vacancyStore.updateVacancy(updatedVacancy).subscribe(() => {
          this.openSnackAndCallBS('Vacancy was successfully updated! 👌');
        });
      }
    });
  }

  // TODO: Make onAddPossibleCandidates
  // create CandidateForVacancy[] and pass to vacancyStore.addPossibleCandidates()
  onAddPossibleCandidate() {
    // const candidate = new CandidateForVacancy(2);
    // this.vacancyStore
    //   .addPossibleCandidate(candidate)
    //   .subscribe(() =>
    //     this.matSnack.openSnackBar('New possible candidate was added! 🐱')
    //   );
  }

  goToCandidatePage(id: number): void {
    this.candidateStore
      .bootstrapCandidate(id)
      .then(() => this.router.navigate(['/candidates', id]));
  }

  openSnackAndCallBS(msg: string): void {
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }

  private createRequirementsArrForRendering(): void {
    this.reqPub = [];
    this.reqPriv = [];
    this.notReqPub = [];
    this.notReqPriv = [];

    for (const requirement of this.vacancy.requirements) {
      if (requirement.require && requirement._public) {
        this.reqPub.push(requirement);
      } else if (requirement.require && !requirement._public) {
        this.reqPriv.push(requirement);
      } else if (!requirement.require && requirement._public) {
        this.notReqPub.push(requirement);
      } else {
        this.notReqPriv.push(requirement);
      }
    }
  }

  getClassForStatus(status: VACANCY_STATUS): string {
    return `vacancy__status--${status}`;
  }
}
