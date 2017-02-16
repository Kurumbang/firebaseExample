// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { routing } from './app.routing';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'
import { firebaseConfig } from './../environments/firebase.config';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';


// Services
import { AuthenticationService } from './service/authentication.service';
import { LoginRegistrationService } from './service/loginRegistration.service';
import { FireDataBaseService } from './service/firedatabase.service';


const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    HomeComponent,
  ],
  providers: [
    LoginRegistrationService,
    AuthenticationService,
    FireDataBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
