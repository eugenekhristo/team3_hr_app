import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';

@Component({
  selector: 'hr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  f: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackMessageService: SnackMessageService
  ) {}

  ngOnInit() {
    this.f = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const { email, password } = this.f.value;
    this.userService.getUserByEmail(email).subscribe((user: User) => {
      if (user) {
        if (password === user.password) {
          this.snackMessageService.openSnackBar('Login!');
        } else {
          this.snackMessageService.openSnackBar(`Password doesn't correct for the email!`, 'error');
        }
      } else {
        this.snackMessageService.openSnackBar('No user with such an email!', 'error');
      }
    });
  }

}
