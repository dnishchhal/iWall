import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { FirstPage } from '../first/first';
import { LoggedInPage } from '../loggedin/loggedin';
import { LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TabsPage} from '../tabs/tabs';



/**
 * Generated class for the SignIn page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SignInPage {

	@ViewChild('email') user;
  @ViewChild('password') password ;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController,public alertCtrl:AlertController,public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signIn()
  {
  		console.log('message',this.user.value,this.password.value);

      this.fire.auth.signInWithEmailAndPassword(this.user.value,this.password.value)
        .then((success) => {
          console.log(success);
          let loader = this.loadingCtrl.create({
            content: "Logging In...",
            duration: 2000
          });
    loader.present();
          this.navCtrl.setRoot(TabsPage);
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

          else if(error.code == 'auth/wrong-password')
          {
             this.toastCtrl.create({
                  message : "Incorrect Password",
                  duration : 2000

              }).present(); 
          }

          else if (error.code == 'auth/user-not-found') 
          {
             this.alertCtrl.create({
                  title : "No Such Account",
                  subTitle : this.user.value,
                  message : "Do You Want to Create New Account",
                  buttons: [
                            {
                              text: 'Disagree',
                              handler: () => {
                                console.log('Disagree clicked');
                              }
                            },
                            {
                              text: 'Agree',
                              handler: () => {
                                this.navCtrl.setRoot(FirstPage);
                              }
                            }
                          ]

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

}
