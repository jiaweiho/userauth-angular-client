import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  //matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    const valid = this.emailFormControl.valid && this.passwordFormControl.valid;
    console.log('Valid?', valid); // true or false
    console.log('Email', email);
    console.log('Password', this.passwordFormControl.value.password);

    if (valid) {
      console.log(`Logging in...username: ${email}, password: ${password}`);
      this.authService.login(email, password).subscribe(response => console.log(response), err => console.log(err));
    }
  }

  validateFields(): boolean {
    // If email or password is empty invalidate them. 
    // Return text below both fields when incorrect format
  
    if (!this.emailFormControl.value) {
      console.log('invalid EMAIL');
      console.log(JSON.stringify(this.emailFormControl.value));
      return false;
    }

    return true;
  }

}
