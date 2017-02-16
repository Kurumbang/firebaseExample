import { AuthenticationService } from './../service/authentication.service';
import { FireDataBaseService } from './../service/firedatabase.service';
import { LoginRegistrationService } from './../service/loginRegistration.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  changePassword: string;
  status: string;
  user: any;
  posts: any[] = [];
  constructor(
    private loginRegistrationService: LoginRegistrationService,
    private fireDataBaseService: FireDataBaseService
  ) {
    fireDataBaseService.getAllPosts().subscribe(response => {
      this.posts = response;
      console.log(this.posts);
      console.log("POST RESPONSE", response);
    }, error => console.log(error));
    console.log("POSTS:", this.posts);

    loginRegistrationService.user$.subscribe((response) => {
      this.user = response;
      console.log("HOME USER:", this.user)
    }, error => {
      console.log("Home User ERROR:", error);
    });


  }

  logout() {
    this.loginRegistrationService.logOut();
  }

  updatePassword(changepassword: string) {
    this.loginRegistrationService.updatePassword(changepassword);
  }

  post(_status) {
    console.log("POST");
    this.fireDataBaseService.createNodeList('/posts');
    this.fireDataBaseService.pushData({ date: new Date().getTime(), description: _status, user_id: this.user.uid });
  }

}
