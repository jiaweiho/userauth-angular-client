import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  failedAttempt: number = 1;
  maxAttempts: number = 3;
  blockDuration: number = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.config().subscribe(config => {
      this.maxAttempts = config.maxAttempts;
      this.blockDuration = config.blockDuration;
    }, err => console.log(err));
  }

  onSubmit() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    const valid = this.emailFormControl.valid && this.passwordFormControl.valid;
    console.log('Valid?', valid); // true or false
    console.log('Email', email);
    console.log('Password', password);

    if (valid) {
      console.log(`Logging in...username: ${email}, password: ${password}`);
      this.authService.login(email, password).subscribe(response => {console.log(response);}, err => {console.log(err); this.failedAttempt++});
    }
  }

}
