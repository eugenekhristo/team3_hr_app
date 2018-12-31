import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hr-system-shell',
  templateUrl: './system-shell.component.html',
  styleUrls: ['./system-shell.component.scss']
})
export class SystemShellComponent implements OnInit {
  choosenLang = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {}

  switchLang(lang: string): void {
    this.choosenLang = lang;
    this.translate.use(lang);
  }

}
