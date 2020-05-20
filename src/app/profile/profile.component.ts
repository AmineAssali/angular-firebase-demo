import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  connectedUser: any;
  docId:any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('-- ngAfterContentInit --');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getConnectdUser();
  }

  edit() {
    console.log('edit method');
    this.authService.updateConnectedUser(this.docId,this.connectedUser)
  }

  getConnectdUser() {
    this.authService.getConnectdUser(this.user.uid).subscribe(result => {
      console.log('the user is');
      console.log(result[0].data);
      this.docId = result[0].id;
      this.connectedUser = result[0].data;
    });
  }


}
