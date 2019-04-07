
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable()
export class AuthServiceProvider {

	private user: firebase.User;
	public currentUserid: String;
	
	//Using this boolean to determine if a user needs to sign in or not when editing a player
  isLoggedIn:boolean = false;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
			this.currentUserid = user.uid;
		
		});
	}

	//This sign in function is called from login.ts, credentials consist of email and password.

	signInWithEmail(credentials) {
      console.log("Details are being checked in auth service");
        this.isLoggedIn = true;
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
             credentials.password);
        
	}

}