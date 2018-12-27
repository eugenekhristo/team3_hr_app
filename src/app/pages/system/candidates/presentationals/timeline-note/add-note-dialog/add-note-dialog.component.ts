import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hr-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent implements OnInit {
  body: string;

  constructor() { }

  ngOnInit() {
  }

}
