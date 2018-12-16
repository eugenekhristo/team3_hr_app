import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/internal/operators';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

export interface VacancyInfo {
  id: number;
  name: string;
  description: string;
  position: string;
  status: string;
}

@Component({
  selector: 'hr-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss']
})
export class VacancyViewComponent {
  readonly Object = Object;
  vacancy: VacancyInfo = {
    id: 1,
    name: 'Mifort developer ',
    description: ' We are looking for a responsible, active employee with leadership qualities and meeting the following requirements:\n' +
      'work experience: 3 years or more\n' +
      'knowledge of English: B1 and above ',
    position: 'Front-end developer',
    status: 'opened',
  };
  candidateList = [
    {
      id: 1,
      name: 'Sam',
      surname: 'Scarlett ',
      position: 'Front-end developer',
      salary: {
        count: 500,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Mac',
      surname: 'Sam ',
      position: 'Front-end developer',
      salary: {
        count: 550,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Lili',
      surname: 'Mac ',
      position: 'Front-end developer',
      salary: {
        count: 550,
        type: '$'
      }
    }];
  skillsCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  allSkills: string[] = ['TS', 'JS', 'Java', 'C#', 'C++', 'PHP', 'Python'];

  @ViewChild('newSkillInput') newSkillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  chooseSkills: FormGroup;

  constructor(private fb: FormBuilder) {
    this.chooseSkills = fb.group({
      ts: [false],
      js: [true],
      java: [false],
      cpp: [false],
      cSharp: [false],
      python: [false],
      php: [false],
    });

    console.log(this.chooseSkills.controls);

    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }
}
