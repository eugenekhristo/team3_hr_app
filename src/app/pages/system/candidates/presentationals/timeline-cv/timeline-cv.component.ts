import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CV } from 'src/app/core/models/cv.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'hr-timeline-cv',
  templateUrl: './timeline-cv.component.html',
  styleUrls: ['./timeline-cv.component.scss']
})
export class TimelineCvComponent implements OnInit {
  @Input() cv: CV;
  @Output() deleteCV = new EventEmitter<CV>();

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  onDelete() {
    this.deleteCV.emit(this.cv);
  }

  downloadCv(cv: CV) {
    const a = document.createElement('a');
    a.download = cv.name;
    a.href = cv.data;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  }
}
