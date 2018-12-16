import { Component, OnInit } from '@angular/core';
import { SnackMessagePbService } from '../../services/snack-message-pb.service';
import { MESSAGE_TYPE } from '../../services/snack-messgae.service';

@Component({
  selector: 'hr-snack-message',
  templateUrl: './snack-message.component.html',
  styleUrls: ['./snack-message.component.scss']
})
export class SnackMessageComponent implements OnInit {
  message: string;
  type: MESSAGE_TYPE;

  constructor(private snackMessagePbService: SnackMessagePbService) {}

  ngOnInit() {
    this.message = this.snackMessagePbService.message;
    this.type = this.snackMessagePbService.type;
  }

  // get message() {
  //   return this._message;
  // }

  // set message(message: string) {
  //   this._message = message;
  // }
}
