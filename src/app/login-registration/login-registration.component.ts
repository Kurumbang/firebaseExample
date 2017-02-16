import { LoginRegistrationService } from './../service/loginRegistration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  constructor(private loginRegistrationService: LoginRegistrationService, ) { }

  ngOnInit() {
  }

  login(_emai: string, _password: string) {
    this.loginRegistrationService.signInWithPassword(_emai, _password);
  }

  loginGoogle() {
    this.loginRegistrationService.signinWithGoogle();
  }

  registerNewUser(_emai: string, _password: string) {
    this.loginRegistrationService.createUser(_emai, _password);
  }

  resetPassword(_email: string) {
    this.loginRegistrationService.resetPassword(_email);
  }

}
