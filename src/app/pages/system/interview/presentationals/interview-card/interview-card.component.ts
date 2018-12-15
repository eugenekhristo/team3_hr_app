import { Component, OnInit, Input } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';

@Component({
  selector: 'hr-interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss']
})
export class InterviewCardComponent implements OnInit {
  @Input() interview: InterviewClient;

  constructor(private matConfirm: MatConfirmService) { }

  ngOnInit() {
  }

  onDeleteInterview() {
    const dialogRef = this.matConfirm.open('Are you sure you wanna delete an interview?');
    dialogRef.afterClosed().subscribe(console.log);
  }

}
