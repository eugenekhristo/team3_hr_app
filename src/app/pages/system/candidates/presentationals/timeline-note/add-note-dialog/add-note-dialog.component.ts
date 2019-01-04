import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TimelineNote } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent implements OnInit {
  body: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TimelineNote) {}

  ngOnInit() {
    if (this.data) {
      this.body = this.data.body;
    }
  }
}
