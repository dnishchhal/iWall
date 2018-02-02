import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { FirstPage } from '../pages/first/first';
import { SignInPage } from '../pages/signin/signin';
import { LoggedInPage } from '../pages/loggedin/loggedin';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyDLG11t5fDk-qss1D9kq-oIvfeZ-Rck2EA",
    authDomain: "ionic-b205f.firebaseapp.com",
    databaseURL: "https://ionic-b205f.firebaseio.com",
    projectId: "ionic-b205f",
    storageBucket: "ionic-b205f.appspot.com",
    messagingSenderId: "232047115499"
  };


@NgModule({
  declarations: [
    MyApp,
    FirstPage,
    SignInPage,
    LoggedInPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        scrollAssist: false, 
        autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FirstPage,
    SignInPage,
    LoggedInPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
