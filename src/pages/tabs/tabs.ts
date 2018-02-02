import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private fire: AngularFireAuth,public menuCtrl: MenuController) {

  }

  signOut()
  {
  	this.fire.auth.signOut();
  }


}
