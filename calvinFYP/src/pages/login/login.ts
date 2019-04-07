import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddReviewPage} from '../add-review/add-review'; 


import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginForm: FormGroup;
    loginError: string;
    paramData:any;

	constructor(
		private navCtrl: NavController,
        private auth: AuthServiceProvider,
        public navParams: NavParams,
		fb: FormBuilder ) 
	
		{

		//Binding the form fields and also setting their validators in the constructor.

		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
		
		
		//passing the player details along in the nav params
        this.paramData = navParams.data;
        console.log('the monument ID passed in NavParams to Login page is:');
        console.log(navParams.data.id);
  }
  
  login() {

		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		//Create an object from the login form data

		let credentials = {
			email: data.email,
			password: data.password
		};

		//Pass the detail to auth-service.ts. If it returns true, navigate to
		// the edit player page with the data, which are the details of the player
    // to edit retrieved from the list item
    console.log("Passing the login details to auth service");

		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.push(AddReviewPage, {
                    id: this.navParams.data.id
                }).then(() =>{	console.log("CURRENT USER ID IS ", this.auth.currentUserid)}),
				error => this.loginError = error.message
			);
	}

}
