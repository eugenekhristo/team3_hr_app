import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'hr-new-notes-dialog',
  templateUrl: './new-notes-dialog.component.html',
  styleUrls: ['./new-notes-dialog.component.scss']
})
export class NewNotesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
