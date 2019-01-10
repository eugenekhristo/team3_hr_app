import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hr-edit-short-info-dialog',
  templateUrl: './edit-short-info-dialog.component.html',
  styleUrls: ['./edit-short-info-dialog.component.scss']
})
export class EditShortInfoDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: string, surname: string},
  ) { }

  ngOnInit() {
  }

}
