import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FireDataBaseService } from './firedatabase.service';
import { Injectable, Inject } from '@angular/core';

@Injectable()

export class LoginRegistrationService {

    isLogged: boolean;
    isVerified: boolean;

    private user = new BehaviorSubject<any>(null);
    user$ = this.user.asObservable();
    constructor(
        private af: AngularFire,
        private router: Router,
        private authenticationService: AuthenticationService,
        private firedatabaseService: FireDataBaseService
    ) {
        af.auth.subscribe(_user => {
            /* _user.auth.sendEmailVerification()*/
            console.log("USER::", _user)
            if (_user) {
                /*this.isLogged = true;*/
                this.user.next(_user);

                if (_user.auth.emailVerified) {
                    this.isVerified = true;
                } else {
                    this.sendEmailVerification(_user)
                }
            } else {
                this.isLogged = false;
            }
        });
    }

    createUser(email: string, password: string) {
        return this.af.auth.createUser({
            email: email,
            password: password
        }).then((response) => {
            console.log("RESPONSE", response);
            this.firedatabaseService.createNode('/users/' + response.uid);
            this.firedatabaseService.setData({ email: response.auth.email, name: "bla bla bla" });

        });
    }

    sendEmailVerification(user) {
        return user.auth.sendEmailVerification()
            .then(() => console.log("Send Mail!"))
            .catch(error => console.log("Mail Error", error));
    }

    signInWithPassword(email: string, password: string) {
        return this.af.auth.login({
            email: email,
            password: password
        }).then((response) => {
            this.authenticationService.saveUserAuthentication(response.auth.refreshToken, response.uid, response.auth.emailVerified, this.isLogged);
            if (response.auth.emailVerified) {
                this.router.navigate(["/home"]);
            } else {
                console.log("Please verify your email first!!")
            }

        }).catch(error => console.log("Sign in Error", error));
    }

    signinWithGoogle() {
        console.log("Signin Google");
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        }).then((response) => {
            this.firedatabaseService.createNode('/users/' + response.uid);
            this.firedatabaseService.setData({ email: response.auth.email, name: "bla bla bla" });
            console.log("GOOGLE RESPONSE", response);
            this.authenticationService.saveUserAuthentication(response.auth.refreshToken, response.uid, response.auth.emailVerified, this.isLogged);
            console.log("Signed In With Google");
            if (response.auth.emailVerified) {
                this.router.navigate(["/home"]);
            } else {
                console.log("Please verify your email first!!")
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    logOut() {
        console.log("User Log out success");
        this.authenticationService.revokeUserAuthentication();
        this.router.navigate(['/']);
        return this.af.auth.logout();

    }

    updatePassword(newPassword: string) {
        return this.user.auth.updatePassword(newPassword).then((response) => {
            console.log("New/Changed Password", response);
        }).catch(error => console.log("Update Password Error", error));
    }

    resetPassword(email: string): any {
        firebase.auth().sendPasswordResetEmail(email)
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.log("Reset Password Error", error));
        //TODO..
        /*  console.log("SendPasswordResetEmail")
          return this.af.auth.sendPasswordResetEmail(email).then((response) => {
              console.log(response);
          }).catch(error => console.log("Sign in Error", error));*/
        /*return firebase.auth().sendPasswordResetEmail(email);*/
    }


}