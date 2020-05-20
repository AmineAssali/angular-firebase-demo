import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public email: string;
  public password: string;
  public divName = 'Login';

  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6), Validators.maxLength(15)]),
    fullname:new FormControl('',[]),
    phone:new FormControl('',[]),
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  get mail() {
    return this.userForm.get('email')
  }

  get passwordPin() {
    return this.userForm.get('password')
  }

  

  login() {
    console.log('signIn method');
    console.log(this.userForm.value.email);
    console.log(this.userForm.value.password);

    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password);
      this.email = this.password = '';
    }
  }

  signup() {
    if (this.userForm.valid) {
      console.log('signUP method');
      this.authService.signup(this.userForm);
    }
  }


  displayDiv(div){
    this.divName = div;
  }
  
  
  logout() {
    this.authService.logout();
  }

}
