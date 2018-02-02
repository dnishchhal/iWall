import { Component, ViewChild } from '@angular/core';
import { Platform,Nav ,LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirstPage } from '../pages/first/first';
import { LoggedInPage } from '../pages/loggedin/loggedin';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(private fire: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen , 
    public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create();
    loader.present();
    this.listenToUserStatusUpdate(loader);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  listenToUserStatusUpdate(loader: any) {
  this.fire.auth.onAuthStateChanged((user) => {
      if(loader)
          loader.dismiss();
      console.log('The User:', user);
      if (user) {
          this.nav.setRoot(TabsPage);
      } else {
          this.nav.setRoot(FirstPage);
      }
  });
}

}

