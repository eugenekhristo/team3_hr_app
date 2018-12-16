import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewNotesDialogComponent} from './new-notes-dialog/new-notes-dialog.component';
import {NewExperienceDialogComponent} from './new-experience-dialog/new-experience-dialog.component';
import {NewCvDialogComponent} from './new-cv-dialog/new-cv-dialog.component';

export interface CandidateNotes {
  Note: string;
  date: Date;
}

export interface CandidateExperience {
  companyName: string;
  dateFrom: Date;
  dateTo: Date;
  position: string;
  date: Date;
}

@Component({
  selector: 'hr-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  interviewSrc = 'https://pp.userapi.com/c846124/v846124033/13c9f6/ObzTSC3ZsW0.jpg';
  cvSrc = 'https://pp.userapi.com/c846124/v846124033/13c9fd/d0YzLGHlF1o.jpg';
  experienceSrc = 'https://pp.userapi.com/c846124/v846124033/13c9ef/8bOFWRFc1P8.jpg';
  notesSrc = 'https://pp.userapi.com/c846124/v846124033/13ca04/Az4jQeTtQqc.jpg';

  candidateInfo = [];
  notes: CandidateNotes[] = [];
  experiences: CandidateExperience[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  addCv() {
    const dialogNew = this.dialog.open(NewCvDialogComponent, {
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
        result.type = 'CV';
        this.candidateInfo.push(result);
        this.sortData();
      }
    });
  }

  downloadCv(cv) {
    const a = document.createElement('a');
    a.download = cv.name;
    a.href = cv.data;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  }

  sortData() {
    this.candidateInfo.sort((n1, n2) => {
      return n2.date.getTime() - n1.date.getTime();
    });
  }

  addNotes() {
    const dialogNew = this.dialog.open(NewNotesDialogComponent, {
      data: {...this.notes}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
        result.type = 'Note';
        this.candidateInfo.push(result);
        this.sortData();
      }
    });
  }

  addInterview() {

  }

  addExperience() {
    const dialogNew = this.dialog.open(NewExperienceDialogComponent, {
      data: {...this.experiences}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
        result.type = 'Experience';
        this.candidateInfo.push(result);
        this.sortData();
      }
    });
  }

  saveNotes(index: number, element) {
    this.candidateInfo[index].Note = element.Note;
    console.log(this.candidateInfo[index].Note);
  }

  saveExperience(index: number, element) {
    this.candidateInfo[index].companyName = element.companyName;
    this.candidateInfo[index].position = element.position;
    this.candidateInfo[index].dateFrom = element.dateFrom;
    this.candidateInfo[index].dateTo = element.dateTo;
  }

  closeBlock(index: number) {
    this.candidateInfo.splice(index, 1);

  }

}
