import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Observable } from 'rxjs';
import {
  Vacancy,
  CandidateForVacancy
} from 'src/app/core/models/vacancy.model';
import { Candidate } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';

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
    private matSnack: SnackMessageService
  ) {}

  ngOnInit() {
    this.vacancyStore
      .bootstrapVacancy(this.route.snapshot.params['id'])
      .subscribe(vacancy => {
        this.vacancy$ = this.vacancyStore.vacancy$;
        this.possibleCandidates$ = this.vacancyStore.possibleCandidates$;
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
}
