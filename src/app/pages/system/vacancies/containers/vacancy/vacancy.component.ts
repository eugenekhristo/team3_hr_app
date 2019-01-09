import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Observable } from 'rxjs';
import {
  Vacancy,
  CandidateForVacancy
} from 'src/app/core/models/vacancy.model';
import { Candidate } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatDialog } from '@angular/material';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { EditVacancyDialogComponent } from '../../presentationals/edit-vacancy-dialog/edit-vacancy-dialog.component';
import { FilterVacanciesService } from 'src/app/core/services/filter-vacancies.service';

@Component({
  selector: 'hr-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  vacancy$: Observable<Vacancy>;
  possibleCandidates$: Observable<Candidate[]>;

  constructor(
    private route: ActivatedRoute,
    private vacancyStore: VacancyStore,
    private matDialog: MatDialog,
    private matSnack: SnackMessageService,
    private matConfirm: MatConfirmService,
    private router: Router,
    public filterService: FilterVacanciesService
  ) {}

  ngOnInit() {
    this.vacancyStore
      .bootstrapVacancy(this.route.snapshot.params['id'])
      .subscribe(() => {
        this.vacancy$ = this.vacancyStore.vacancy$;
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
            this.router.navigate(['/vacancies'], {queryParams: {
              isDeleted: true
            }});
          });
        }
      });
  }

  onEditVacancy(vacancy: Vacancy): void {
    const ref = this.matDialog.open(EditVacancyDialogComponent, {data: vacancy});

    ref.afterClosed().subscribe(res => {
      if (res) {
        const updatedVacancy = {...vacancy, ...res};
        this.vacancyStore.updateVacancy(updatedVacancy).subscribe(() => {
          this.openSnackAndCallBS('Vacancy was successfully updated! 👌');
        });
      }
    });
  }

  onAddPossibleCandidate() {
    const candidate = new CandidateForVacancy(2);

    this.vacancyStore
      .addPossibleCandidate(candidate)
      .subscribe(() =>
        this.matSnack.openSnackBar('New possible candidate was added! 🐱')
      );
  }

  openSnackAndCallBS(msg: string): void {
    console.log('how many times running?');
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }
}
