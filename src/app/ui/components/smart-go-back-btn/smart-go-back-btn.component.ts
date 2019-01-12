import { Component, OnInit, Input } from '@angular/core';
import { UrlWatcherService } from 'src/app/core/services/url-watcher.service';

@Component({
  selector: 'hr-smart-go-back-btn',
  templateUrl: './smart-go-back-btn.component.html',
  styleUrls: ['./smart-go-back-btn.component.scss']
})
export class SmartGoBackBtnComponent implements OnInit {
  @Input() defaultUrl: string[];

  constructor(public routesWatcher: UrlWatcherService) { }

  ngOnInit() {
  }

}
