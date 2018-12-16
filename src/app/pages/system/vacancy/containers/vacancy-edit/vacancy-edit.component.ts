import {Component, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Candidates} from './add-candidate/add-candidate.component';

export interface VacancyInfo {
  id: number;
  name: string;
  description: string;
  position: string;
  status: string;
}

@Component({
  selector: 'hr-vacancy-edit',
  templateUrl: './vacancy-edit.component.html',
  styleUrls: ['./vacancy-edit.component.scss']
})
export class VacancyEditComponent {
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
  isShowAddCandidate = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Angular'];
  allSkills: string[] = ['TS', 'JS', 'Java', 'C#', 'C++', 'PHP', 'Python'];

  @ViewChild('newSkillInput') newSkillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  chooseSkills: FormGroup;
  newSkill: string;

  constructor(private fb: FormBuilder) {
    // Эт-форма. Она состоит изформ контролов. Таким образом данная форма состоит 6 форм контролов,
    // Если нужно добавить еще один поункт в форму, то нам надо в нее динамически впихнутьформ контрол. Это делается так:
    // this.chooseSkills.addControl('name', new FormControl(...))
    // Это надо для того чтобы добавить в форму скилов
    this.chooseSkills = fb.group({
      ts: [false],
      js: [false],
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

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillsCtrl.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  deleteCandidate(i: number) {
    this.candidateList.splice(i, 1);
  }

  addCandidate(e: Candidates) {
    // this.candidateList.push(<CandidateInfo>e);

    this.candidateList.push(e);
  }

  findCandidates() {
    // get candidates
  }

  addNewSkill() {
    const value = this.newSkillInput.nativeElement.value;
    this.chooseSkills.addControl(value, new FormControl(false));
  }

}
