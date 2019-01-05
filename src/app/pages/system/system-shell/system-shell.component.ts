import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'hr-system-shell',
  templateUrl: './system-shell.component.html',
  styleUrls: ['./system-shell.component.scss']
})
export class SystemShellComponent implements OnInit {
  choosenLang = 'en';

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {}

  switchLang(lang: string): void {
    this.choosenLang = lang;
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout();
  }
}
