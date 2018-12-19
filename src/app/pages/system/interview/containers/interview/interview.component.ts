import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';
import { InterviewService } from '../../../shared/services/interview.service';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hr-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  interviews: object[] = [];
  selectedDate: string;

  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  constructor(
    private interviewDialog: InterviewDialogService,
    private interviewService: InterviewService,
    private matSnack: SnackMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setCalendarOptions();
    this.interviewService.getAllInterviews().subscribe(interviews => {
      this.interviews = interviews;
      this.calendarOptions.events = this.interviews;
    });

    this.route.queryParams.subscribe(params => {
      if (params['event']) {
        switch (params['event']) {
          case 'interviewDeleted':
            window.setTimeout(
              () =>
                this.matSnack.openSnackBar(
                  'The interview event was successfully deleted!'
                ),
              0
            );
            break;
        }
      }
    });
  }

  private setCalendarOptions() {
    this.calendarOptions = {
      minTime: '07:00:00',
      maxTime: '20:00:00',
      timezone: 'local',
      buttonText: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List',
        today: 'Today'
      },
      header: {
        left: 'today',
        right: 'month,agendaWeek,agendaDay,list',
        center: 'prev, title, next'
      },
      firstDay: 1,
      height: 'parent',
      weekends: false,
      eventLimit: true,
      events: []
    };
  }

  setSelectedDate(e: CustomEvent) {
    this.selectedDate = moment(e.detail.date._d).format('YYYY-MM-DD') as string;
  }

  openAddInterviewDialog() {
    const dialogRef = this.interviewDialog.open(
      new InterviewClient(null, null, this.selectedDate, this.selectedDate),
      INTERVIEW_DIALOG_TYPES.add
    );

    dialogRef.afterClosed().subscribe(interview => {
      if (interview) {
        this.interviewService.addInterview(interview).subscribe(res => {
          this.matSnack.openSnackBar('Interview event is added');
          this.renderInterviewEvent({ ...interview, id: res.id });
        });
      }
    });
  }

  onEventClick(e: CustomEvent) {
    const interviewId = e.detail.event.id;
    this.router.navigate([interviewId], { relativeTo: this.route });
    // console.log(e);
  }

  private renderInterviewEvent(interview: InterviewClient) {
    this.calendar.fullCalendar('renderEvent', interview);
  }
}

// FOR DB JSON interviews
// {
//   "candidateId": 5,
//   "vacancyId": 6,
//   "start": "2018-12-21 09:00:00",
//   "end": "2018-12-21 10:00:00",
//   "place": "Minsk, Nemiga street, 6",
//   "title": "Millie Bobby Brown on UI/UX Designer",
//   "id": 1
// },
// {
//   "candidateId": 1,
//   "vacancyId": 1,
//   "start": "2018-12-25 09:00",
//   "end": "2018-12-25 10:00",
//   "title": "Till Lindemann on Java",
//   "id": 2
// },
// {
//   "candidateId": 3,
//   "vacancyId": 5,
//   "start": "2018-12-27 08:00",
//   "end": "2018-12-27 09:00",
//   "title": "Serj Tankian on NodeJS",
//   "id": 3
// }
