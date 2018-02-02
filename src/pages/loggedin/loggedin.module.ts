import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedInPage } from './loggedin';

@NgModule({
  declarations: [
    LoggedInPage,
  ],
  imports: [
    IonicPageModule.forChild(LoggedInPage),
  ],
})
export class LoggedinPageModule {}
