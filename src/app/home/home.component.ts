import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Refill } from 'src/models/refill';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  divName: string = '';
  balance: number ;
  type: string = '';
  refill: Refill = new Refill();
  refills: any;

  searchType:String = '';

  pay:String = 'morocco';
  operative:String ;


  moroccoOperative:any = [];
  tunisiaOperative:any = [];

  constructor(private authService: AuthService, private router: Router) {

    this.moroccoOperative = ['maroc telecom','meditel','inwi'];
    this.tunisiaOperative = ['tunisia telecom','orange'];
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('-- ngAfterContentInit --');
    this.user = JSON.parse(localStorage.getItem('user'));

    this.authService.getRefillsByUid(this.user.uid).subscribe(result => {
      this.refills = result;
      console.log(this.refills);
    });


    this.authService.getConnectdUser(this.user.uid);

  }

  ngOnInit(): void {

  }

  showDiv(name) {
    this.divName = name;
  }

  chooseTypeOperator(operator) {
    this.refill.type = operator;
    this.type = operator;
  }

  save() {
    var json = {
      uid: this.user.uid,
      balance: Number(this.balance),
      date: new Date(),
      type: this.operative
    }
    this.authService.addRefill(json);
  }


  search(){
    console.log('search method');
    this.authService.search(this.searchType).subscribe(result => {
      this.refills = result;
      console.log(this.refills);
    });
  }

  test(){
    console.log('search method');
  }


  selectPay(){
    console.log(this.operative);
  }




}
