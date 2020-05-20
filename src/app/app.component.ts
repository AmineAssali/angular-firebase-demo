import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseApp';

  user: User;
  // userInfo:any ;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    // if (this.user == null) {
      console.log('hello hello ');
      this.user = JSON.parse(localStorage.getItem('user'));
      // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(this.user);
    // }

  }


  logout() {
    this.user = null;
    this.authService.logout();
  }

  goTo(page) {
    this.router.navigate([page]);
  }

}
