import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'hr-calendar',
  templateUrl: './hr-calendar.component.html',
  styleUrls: ['./hr-calendar.component.scss']
})
export class HrCalendarComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() interviewDates: string[];
  @Output() datePicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() addEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('calendar') calendarRef: ElementRef;
  @ViewChild('header') calendarHeader: ElementRef;

  private todayDate = new Date();
  year = this.todayDate.getFullYear();
  month = this.todayDate.getMonth();

  private prevClickedTd: HTMLElement;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['interviewDates']) {
      this.createCalendar(this.year, this.month);
    }
  }

  ngOnInit() {
    this.datePicked.emit(this.sqlDateFormat(this.todayDate));
  }

  ngAfterViewInit() {
    this.createCalendar(this.year, this.month);
  }

  createCalendar(year: number, month: number): void {
    const TOAL_ROWS = 6;
    let cur_row = TOAL_ROWS;

    const calendarBody = document.createElement('table');

    // FIXME: in the future maybe remove event listener when component destroyed
    calendarBody.addEventListener('click', e => {
      if (e.target['nodeName'] !== 'TD') {
        return;
      }

      const clickedTd = e.target as HTMLElement;

      if (
        !clickedTd.classList.contains('prev-month') &&
        !clickedTd.classList.contains('next-month')
      ) {
        if (this.prevClickedTd) {
          this.prevClickedTd.classList.remove('clicked');
        }

        clickedTd.classList.add('clicked');
        this.prevClickedTd = clickedTd;

        const pickedDate = clickedTd['dataset']['date'];
        this.datePicked.emit(pickedDate);
      }
    });

    calendarBody.classList.add('eug_calendar__body');
    const firstRow = `
      <tr>
        <th class="eug_calendar__th">MON</th>
        <th class="eug_calendar__th">TUE</th>
        <th class="eug_calendar__th">WED</th>
        <th class="eug_calendar__th">THU</th>
        <th class="eug_calendar__th">FRI</th>
        <th class="eug_calendar__th">SAT</th>
        <th class="eug_calendar__th">SUN</th>
      </tr>
    `;
    calendarBody.innerHTML = firstRow;

    const date = new Date(year, month);
    const timestamp = new Date();
    const todayDate = new Date(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate()
    );

    let tr = document.createElement('tr');

    // =========================== create dates for previous month ===========================
    for (let i = 0, day = this.getDay(date); i < day; i++) {
      const prevMonthDate = new Date(year, month, 1 - day + i);
      const td = document.createElement('td');
      td.textContent = `${prevMonthDate.getDate()}`;
      td.setAttribute('data-date', `${this.sqlDateFormat(prevMonthDate)}`);
      td.classList.add('prev-month', 'eug_calendar__td');
      if (this.interviewDates.includes(this.sqlDateFormat(prevMonthDate))) {
        td.classList.add('event');
      }
      tr.appendChild(td);
    }

    // =================== create dates for current month ===========================
    while (date.getMonth() === month) {
      const td = document.createElement('td');
      td.textContent = `${date.getDate()}`;
      td.setAttribute('data-date', `${this.sqlDateFormat(date)}`);
      td.classList.add('eug_calendar__td');

      if (this.interviewDates.includes(this.sqlDateFormat(date))) {
        td.classList.add('event');
      }

      if (date.getTime() === todayDate.getTime()) {
        td.classList.add('today');
      }

      tr.appendChild(td);

      if (this.getDay(date) % 7 === 6) {
        calendarBody.appendChild(tr);
        cur_row--;
        tr = document.createElement('tr');
      }

      date.setDate(date.getDate() + 1);
    }

    // =========================== create dates for the next month ===========================
    let nextMonthDay = 1;
    for (let i = this.getDay(date); i < 7 * cur_row; i++) {
      const nextMonthDate = new Date(year, month + 1, nextMonthDay++);
      const td = document.createElement('td');
      td.textContent = `${nextMonthDate.getDate()}`;
      td.setAttribute('data-date', `${this.sqlDateFormat(nextMonthDate)}`);
      td.classList.add('next-month', 'eug_calendar__td');

      if (this.interviewDates.includes(this.sqlDateFormat(nextMonthDate))) {
        td.classList.add('event');
      }

      tr.appendChild(td);
      if (i % 7 === 6) {
        calendarBody.appendChild(tr);
        tr = document.createElement('tr');
      }
    }

    calendarBody.appendChild(tr);

    const siblingElement = (<HTMLDivElement>this.calendarHeader.nativeElement)
      .nextSibling as HTMLElement;
    if (siblingElement) {
      siblingElement.remove();
    }

    (<HTMLElement>this.calendarRef.nativeElement).appendChild(calendarBody);
  }

  private getDay(date: Date): number {
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day - 1;
  }

  private sqlDateFormat(date: Date): string {
    let month = date.getMonth() + 1 + '';
    let day = date.getDate() + '';

    if (+month < 10) {
      month = `0${month}`;
    }

    if (+day < 10) {
      day = `0${day}`;
    }

    return `${date.getFullYear()}-${month}-${day}`;
  }

  goPrevMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }

    this.createCalendar(this.year, this.month);
  }

  gonextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }

    this.createCalendar(this.year, this.month);
  }

  onAddEvent() {
    this.addEvent.emit();
  }

  formatMonth(month: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[month];
  }
}
