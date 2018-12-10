import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/services/interview.service';
import { InterviewClient } from 'src/app/core/models/interview.model';

@Component({
  selector: 'hr-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  interviewDates: string[] = [];
  interviews: InterviewClient[] = [];
  isInterviewsLoaded = false;
  //FIXME:
  activeDate: string;

  constructor(private interviewService: InterviewService) {}

  ngOnInit() {
    this.interviewService
      .getInterviewsDates()
      .subscribe(dates => {
        this.interviewDates = dates;
      });
  }

  onDatePicked(date: string) {
    this.activeDate = date;

    this.isInterviewsLoaded = false;
    this.interviewService.getInterviewsByDate(date).subscribe(res => {
      this.interviews = res;
      this.isInterviewsLoaded = true;
    });
  }

  onAddInterview() {
    // TODO: open add interview popup
    console.log('add interview');
  }
}
