import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthenticationService } from './service/authentication.service';
import { LoginRegistrationService } from './service/loginRegistration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subscriptions: any[] = [];
  isAuthenticated: boolean = false;
  isVerified: boolean = false;
  isLogged: boolean = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.subscriptions.push(authenticationService.authenticationStateChanged$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

    }))

    this.subscriptions.push(authenticationService.isVerifiedState$.subscribe(isVerified => {
      this.isVerified = isVerified;
      if (isVerified) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/']);
      }
    }))

    this.subscriptions.push(authenticationService.isLoggedState$.subscribe(isLogged => {
      this.isLogged = isLogged;
    }))
    /* this.item = af.database.list('/item');*/

  }

  ngAfterViewInit() {
    var scope = this;
    setTimeout(function () { scope.authenticationService.loadeUserAuthentication() });
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => { sub.unsubscribe() });
  }


}
