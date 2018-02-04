import { Component,ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Content} from 'ionic-angular';
import { File } from '@ionic-native/file';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer'




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  
  @ViewChild(Content)
    content:Content;

  defaultImage = 'assets/imgs/default.gif';

  items = new Array();
  names = new Array();
  imageChange$ = new Subject();


  constructor(public transfer : FileTransfer, private file: File,db: AngularFireStorage, public toastCtrl: ToastController, 
    public navCtrl : NavController) {
  	
    for (var i = 1; i <=33; i++) {
  		var a =   db.storage.ref().child(i%12+'.jpg');
      this.names.push(i%12+'.jpg');
  		a.getDownloadURL()
  		.then(url => {
  			this.items.push(url);
  		});	
  	}    
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  ngAfterViewInit() {
        this.content.ionScroll.subscribe((event: any) => {
        	this.imageChange$.next();
    });
    }

    tap(id)
    {
        var url = id.target.id;
        this.fileTransfer.download(url, this.file.dataDirectory + '1.jpg').then((entry) => {
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          // handle error
        });
        this.toastCtrl.create({
          message :  this.file.dataDirectory,
          duration : 3000
        }).present();
    }

     doRefresh(refresher) {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

}
