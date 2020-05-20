import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { User } from 'src/models/user';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/models/user';
import { Refill } from 'src/models/refill';
import { of, interval } from 'rxjs';
import { mergeMap, map, flatMap } from 'rxjs/operators';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user = afAuth.authState;
  }



  updateProfile(user: User) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName
    }).then(value => {
      console.log(value);
      let user = new User(firebase.auth().currentUser);
      localStorage.setItem('user', JSON.stringify(user));
    }).catch(err => {
      console.log(err);
    })
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        // this.router.navigate(['<!-- enter your route name here -->']);
      })
  }

  signup(userForm) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(userForm.value.email, userForm.value.password)
      .then(value => {
        console.log('Success!', value);
        let user = {
          uid: firebase.auth().currentUser.uid,
          fullname: userForm.value.fullname,
          email: userForm.value.email,
          phone: userForm.value.phone,
          date: new Date()
        }
        this.addUser(user);
        this.sendVerificationMail();
        alert('Your account is created, please confirm it');
      })
      .catch(err => {
        alert('Something went wrong: '+ err.message);
        console.log('Something went wrong:', err.message);
      });
      
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        if (value.user.emailVerified !== true) {
          console.log('Please validate your email address. Kindly check your inbox.');
          alert('Please validate your email address. Kindly check your inbox.');
          // this.sendVerificationMail();
          // window.alert('Please validate your email address. Kindly check your inbox.');

        } else {
          console.log('email validated');
          let user = new User(firebase.auth().currentUser);
          localStorage.setItem('user', JSON.stringify(user));

          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        }
      })
      .catch(err => {
        alert('Email or password is incorect.');
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.afAuth
      .auth
      .signOut();
    localStorage.removeItem('user')
    this.router.navigate(['']);
  }


  addUser(user) {
    this.afs.collection('/users').add(user);
  }

  addRefill(refill) {
    this.afs.collection('/refills').add(refill).then(response=>{
      alert('Refill saved.');
    }).catch(err=>{
      alert('Error saving Refill.');
    });
  }

  getRefillsByUid(uid) {
    console.log('-- get collection --' + uid);
    return this.afs.collection('refills', ref =>
      ref.where('uid', '==', uid)
    ).snapshotChanges();
  }


  getConnectdUser(uid) {
    console.log('the uid is => ' + uid);
    return this.afs.collection('users', ref =>
      ref.where('uid', '==', uid).limit(1)
    ).snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  updateConnectedUser(docId,user) {
    return this.afs.collection('users').doc(docId).update({
      fullname:user.fullname,
      phone:user.phone
    }).then(response=>{
      alert('user updated');
    }).catch(err=>{
      alert('err '+err);
    });
  }


  search(type) {
    return this.afs.collection('refills', ref =>
      ref.where('type', '==', type.toLowerCase())
      // ref.where('type', 'array-contains', type.toLowerCase())
    ).snapshotChanges();
  }

}
