import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedInPage {
	name: string;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
      fire.auth.onAuthStateChanged(data => {
          this.name = data.displayName;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

  signOut()
  {
  	this.fire.auth.signOut();
  }

}
