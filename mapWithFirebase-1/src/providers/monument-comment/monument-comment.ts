import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';


@Injectable()
export class MonumentCommentProvider {

  constructor(public http: HttpClient,  public monumentsDb:AngularFirestore) {
    console.log('Hello MonumentCommentProvider Provider');
  }

  getReview(){

    return this.monumentsDb.collection("monuments").snapshotChanges();
    

  }

}
