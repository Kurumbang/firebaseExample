import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const StorageKeys = {
    TOKEN: "token",
    USER_ID: "UID",
    IS_VERIFIED: "isVerified",
    IS_LOGGED: "isLogged"
}

@Injectable()
export class AuthenticationService {

    private authenticationState = new BehaviorSubject<boolean>(false);
    private isVerifiedState = new BehaviorSubject<boolean>(false);
    private isLoggedState = new BehaviorSubject<boolean>(false);
    private userId: string;
    private token: string;

    authenticationStateChanged$ = this.authenticationState.asObservable();
    isVerifiedState$ = this.isVerifiedState.asObservable();
    isLoggedState$ = this.isLoggedState.asObservable();


    saveUserAuthentication(token: string, userid: string, isVerified: boolean, isLogged: boolean) {
        // Save authentication??
        localStorage.setItem(StorageKeys.TOKEN, token);
        localStorage.setItem(StorageKeys.USER_ID, userid);
        localStorage.setItem(StorageKeys.IS_VERIFIED, String(isVerified));
        localStorage.setItem(StorageKeys.IS_LOGGED, String(isVerified));
        //localStorage.setItem(StorageKeys.IS_LOGGED, String(isLogged));
        this.userId = userid;
        this.token = token;

        this.authenticationState.next(token && token != '');

        this.isVerifiedState.next(isVerified);
        this.isLoggedState.next(isLogged);
        console.log("Save Keys", StorageKeys);
    }

    loadeUserAuthentication() {
        // Load authentication ??
        let token: string = localStorage.getItem(StorageKeys.TOKEN);
        let user_id: string = localStorage.getItem(StorageKeys.USER_ID);
        let isVerified: boolean = localStorage.getItem(StorageKeys.IS_VERIFIED) == 'true';
        let isLogged: boolean = localStorage.getItem(StorageKeys.IS_LOGGED) == 'true';

        this.token = token;
        this.userId = user_id;
        this.isVerifiedState.next(isVerified);
        this.isLoggedState.next(isLogged);

        console.log("Load Keys", localStorage.getItem(StorageKeys.TOKEN));
        console.log("Load Keys", localStorage.getItem(StorageKeys.USER_ID));
        console.log("Load Keys", localStorage.getItem(StorageKeys.IS_VERIFIED));
        console.log("Load Keys", localStorage.getItem(StorageKeys.IS_LOGGED));

    }

    revokeUserAuthentication() {
        // revoke authentication ?
        localStorage.removeItem(StorageKeys.TOKEN);
        localStorage.removeItem(StorageKeys.USER_ID);
        localStorage.removeItem(StorageKeys.IS_VERIFIED);
        localStorage.removeItem(StorageKeys.IS_LOGGED);
        this.isVerifiedState.next(false);
        this.isLoggedState.next(false);

        console.log("Revoke Keys", localStorage.getItem(StorageKeys.TOKEN));
        console.log("Revoke Keys", localStorage.getItem(StorageKeys.USER_ID));
        console.log("Revoke Keys", localStorage.getItem(StorageKeys.IS_VERIFIED));
        console.log("Revoke Keys", localStorage.getItem(StorageKeys.IS_LOGGED));

    }
}