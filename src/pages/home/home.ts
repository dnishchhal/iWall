import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Content} from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  //items: Observable<any[]>;

  @ViewChild(Content)
    content:Content;

  items = new Array();

  imageChange$ = new Subject();


  constructor(db: AngularFireStorage) {
  	for (var i = 1; i <=33; i++) {
  		var a =   db.storage.ref().child(i%12+'.jpg');
  		a.getDownloadURL()
  		.then(url => {
  			this.items.push(url);
  		});	

  	}

  	console.log(this.items);
    
  }

  ngAfterViewInit() {
        this.content.ionScroll.subscribe((event: any) => {
      console.log(event);
      this.imageChange$.next();
    });
    }

}
