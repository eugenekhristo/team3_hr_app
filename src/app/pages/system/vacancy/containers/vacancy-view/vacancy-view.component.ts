import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete} from '@angular/material';
import {VacancyService} from '../../vacancy.service';
import {Candidate} from '../../../../../core/models/candidate.model';

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
export class VacancyViewComponent implements OnInit {
  vacancy: VacancyInfo;
  candidateList: Array<Candidate>;
  skills: any;

  @ViewChild('newSkillInput') newSkillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public  service: VacancyService) {
  }

  ngOnInit(): void {
    this.candidateList = this.service.candidateList;
    this.vacancy = this.service.vacancy;
    this.skills = this.service.skills;
  }

  getSkillKeys() {
    return Object.keys(this.skills);
  }
}
