import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TimelineNote } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-read-note-dialog',
  templateUrl: './read-note-dialog.component.html',
  styleUrls: ['./read-note-dialog.component.scss']
})
export class ReadNoteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TimelineNote) { }

  ngOnInit() {
  }

}
