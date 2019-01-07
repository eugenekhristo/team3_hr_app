import { Component, OnInit, Input } from '@angular/core';
import { TimelineNote } from 'src/app/core/models/candidate.model';
import { MatDialog } from '@angular/material';
import { ReadNoteDialogComponent } from './read-note-dialog/read-note-dialog.component';

@Component({
  selector: 'hr-inter-assets-note',
  templateUrl: './inter-assets-note.component.html',
  styleUrls: ['./inter-assets-note.component.scss']
})
export class InterAssetsNoteComponent implements OnInit {
  @Input() note: TimelineNote;
  isReading = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  readNote() {
    this.dialog
      .open(ReadNoteDialogComponent, { data: this.note.body })
      .afterClosed()
      .subscribe(() => this.isReading = false);
  }
}
