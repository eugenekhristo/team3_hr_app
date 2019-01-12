import { Component, OnInit } from '@angular/core';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Observable } from 'rxjs';
import { Vacancy, VACANCY_STATUS } from 'src/app/core/models/vacancy.model';
import { MatDialog } from '@angular/material';
import { EditVacancyDialogComponent } from '../../presentationals/edit-vacancy-dialog/edit-vacancy-dialog.component';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { FilterVacanciesService } from 'src/app/core/services/filter-vacancies.service';
import { ActivatedRoute } from '@angular/router';
import { UrlWatcherService } from 'src/app/core/services/url-watcher.service';

@Component({
  selector: 'hr-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  vacancies$: Observable<Vacancy[]>;

  toolbarMessage = '';
  vacancyStatuses = Object.values(VACANCY_STATUS);

  constructor(
    public filterService: FilterVacanciesService,
    public vacancyStore: VacancyStore,
    private matDialog: MatDialog,
    private matSnack: SnackMessageService,
    private matConfirm: MatConfirmService,
    private route: ActivatedRoute,

    private routesWatcher: UrlWatcherService
  ) {}

  ngOnInit() {
    this.vacancies$ = this.vacancyStore.filteredVacancies$;

    if (this.route.snapshot.queryParams['isDeleted']) {
      this.openSnackAndCallBS('Vacancy was successfully deleted! 👍');
    }

    this.routesWatcher.setWatchedRoute();
  }

  onAddVacancy(): void {
    const ref = this.matDialog.open(EditVacancyDialogComponent);
    ref.afterClosed().subscribe(res => {
      if (res) {
        const { title, requirements, status, description } = res;
        const newVacancy = new Vacancy(
          title,
          status,
          description,
          requirements
        );
        this.vacancyStore.addVacancy(newVacancy).subscribe(() => {
          this.openSnackAndCallBS('Vacancy was successfully created! ✨');
        });
      }
    });
  }

  onDeleteVacancy(id: number): void {
    this.matConfirm
      .open('Are you sure you wanna delete this vacancy? 😨')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.vacancyStore.deleteVacancy(id).subscribe(() => {
            this.openSnackAndCallBS('Vacancy was successfully deleted! 👍');
          });
        }
      });
  }

  onUpdateVacancy(vacancy: Vacancy): void {
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

  toggleToolbar() {
    this.filterService.isToolbarShown = !this.filterService.isToolbarShown;
    this.toolbarMessage = `${this.filterService.isToolbarShown ? 'Close' : 'Open'} toolbar`;
  }

  getClassForStatus(status: VACANCY_STATUS): string {
    return `vacancy__status--${status}`;
  }

  makeDeepCopy(vacancy: Vacancy): Vacancy {
    return JSON.parse(JSON.stringify(vacancy));
  }

  openSnackAndCallBS(msg: string): void {
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }
}
