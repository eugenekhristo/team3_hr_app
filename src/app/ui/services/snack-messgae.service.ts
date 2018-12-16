import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { SnackMessageComponent } from 'src/app/ui/components/snack-message/snack-message.component';
import { SnackMessagePbService } from './snack-message-pb.service';

export type MESSAGE_TYPE = '' | 'error';

@Injectable()
export class SnackMessageService {

  constructor(
    private snackBar: MatSnackBar,
    private snackMessagePbService: SnackMessagePbService
  ) {}

  openSnackBar(message: string, type?: MESSAGE_TYPE ) {
    this.snackMessagePbService.message = message;
    this.snackMessagePbService.type = type;

    this.snackBar.openFromComponent(SnackMessageComponent, {
      duration: 4000
    });
  }
}
