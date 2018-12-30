import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatDialog} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {AddCandidateComponent} from './add-candidate/add-candidate.component';
import {MatConfirmService} from '../../../../../ui/modules/reusable-mat-confirm/mat-confirm-service';
import {AddSkillComponent} from './add-skill/add-skill.component';
import {SnackMessageService} from '../../../../../ui/services/snack-messgae.service';
import {VacancyInfo, VacancyStatusEnum} from './add-candidate/vacancy-info.interface';
import {VacancyService} from '../../vacancy.service';
import {Router} from '@angular/router';
import {Candidate} from '../../../../../core/models/candidate.model';
import {Location} from '@angular/common';

@Component({
  selector: 'hr-vacancy-edit',
  templateUrl: './vacancy-edit.component.html',
  styleUrls: ['./vacancy-edit.component.scss']
})
export class VacancyEditComponent implements OnInit {
  readonly Object = Object;
  vacancy: VacancyInfo = this.service.vacancy;
  candidateList: Candidate[] = [];
  vacancyStatuses = Object.keys(VacancyStatusEnum);
  vacancyStatusEnum = VacancyStatusEnum;
  skillsCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  allSkills: string[] = ['TS', 'JS', 'Java', 'C#', 'C++', 'PHP', 'Python'];

  @ViewChild('newSkillInput') newSkillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  chooseSkills: FormGroup;
  vacancyForm: FormGroup;

  constructor(private fb: FormBuilder, private matConfirm: MatConfirmService,
              private matDialog: MatDialog,
              private snackMessage: SnackMessageService,
              private service: VacancyService,
              private router: Router,
              private location: Location) {
    this.chooseSkills = fb.group({
      ts: [false],
      js: [false],
      java: [false],
      cpp: [false],
      cSharp: [false],
      python: [false],
      php: [false]
    });

    this.vacancyForm = fb.group({
      name: [this.vacancy.name, [Validators.required, Validators.minLength(3)]],
      status: [this.vacancy.status, [Validators.required]],
      description: [this.vacancy.description, [Validators.minLength(5), Validators.required]],
      position: [this.vacancy.position, [Validators.minLength(2), Validators.required]]
    });

    console.log(this.chooseSkills.controls);

    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(): void {
    // get candidates from backend
    this.getCandidates();
  }

  deleteCandidate(candidate: Candidate) {
    let dialogRef = this.matConfirm.open('Are you sure you wanna delete an interview?');
    dialogRef.afterClosed().subscribe(agreement => {
      if (agreement) {
        this.service.deleteCandidate(candidate).subscribe(res => {
          this.getCandidates();
        });
      }

      dialogRef = null;
    });
  }

  addCandidate(e: Candidate) {
    const dialogRef = this.matDialog.open(AddCandidateComponent);
    dialogRef.afterClosed().subscribe(result => {
      e.id = new Date().getTime();

      this.service.addCandidate(e);
    });
  }

  addNewSkill() {
    const dialogRef = this.matDialog.open(AddSkillComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.allSkills.push(result);
    });

    (dialogRef as any).addSkill = (skill) => {
      this.chooseSkills.addControl(skill, new FormControl(false));
    };
  }

  saveVacancy() {
    if (this.vacancyForm.valid && this.chooseSkills.valid) {
      this.service.skills = this.chooseSkills.value;
      this.service.vacancy = this.vacancyForm.value;

      this.location.back();
      // this.router.navigateByUrl('/vacancyView');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  private getCandidates() {
    this.service.getCandidateList().subscribe(value => {
      this.candidateList = value;
    });
  }
}
