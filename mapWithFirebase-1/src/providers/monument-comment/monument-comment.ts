import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';


@Injectable()
export class MonumentCommentProvider {

  

  constructor(public http: HttpClient,  public monumentsDb:AngularFirestore) {
    console.log('Hello MonumentCommentProvider Provider');
  }

  getReview(id){

    console.log('The document id to get');
    console.log(id);
    
    // let theDoc = this.monumentsDb.doc('monuments/' + id).snapshotChanges();
    //console.log(this.monumentsDb.document('monuments/' + someDocId))
    // return theDoc;

    return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();

    //return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();
    
    //return this.monumentsDb.collection("monuments").doc('cl00001');

    //let document: AngularFirestoreDocument <T>= this.monumentsDb.doc('monuments/' + 'cl00001');

  }

}
