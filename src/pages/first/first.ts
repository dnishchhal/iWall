import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {SignInPage} from '../signin/signin';
import { LoggedInPage } from '../loggedin/loggedin';



/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

	@ViewChild('email') user ;
  @ViewChild('password') password ;
  @ViewChild('name') name ;
  @ViewChild('mobile') mobile ;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

  signUp()
  {
  		console.log('message',this.user.value,this.password.value);
      this.fire.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
        .then((success) => {
          success.updateProfile({
          displayName: this.name.value,
          phoneNumber: parseInt(this.mobile.value)   //Phone Number Not Saving To Firebase 
        }).catch(
        error => {
          console.log(error);
        });        
        })
        .catch(error => {

          console.log(error.code)
          if(error.code == 'auth/invalid-email')
          {
              this.toastCtrl.create({
                  message : "Please Enter Valid Email Address",
                  duration : 2000

              }).present();    
          }

          else if(error.code == 'auth/weak-password')
          {
             this.toastCtrl.create({
                  message : "Minimum 6 length Password",
                  duration : 2000

              }).present(); 
          }

          else if (error.code == 'auth/email-already-in-use') 
          {
             this.toastCtrl.create({
                  message : "Account Already Exist",
                  duration : 2000

              }).present(); 
          }

          else if (error.code == 'auth/network-request-failed')
          {
              this.toastCtrl.create({
                  message : "Network Error",
                  duration : 2000

              }).present();
          }
          
        });

  }  

  pageRedirect()
  {
    this.navCtrl.setRoot(SignInPage);
  }

}
