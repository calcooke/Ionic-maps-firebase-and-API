import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import { _getAngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class MonumentCommentProvider {

  

  constructor(public http: HttpClient,  public monumentsDb:AngularFirestore) {
    console.log('Hello MonumentCommentProvider Provider');
  }

  getReview(id){

    
    // let theDoc = this.monumentsDb.doc('monuments/' + id).snapshotChanges();
    //console.log(this.monumentsDb.document('monuments/' + someDocId))
    // return theDoc;

    return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();

    //return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();
    
    //return this.monumentsDb.collection("monuments").doc('cl00001');

    //let document: AngularFirestoreDocument <T>= this.monumentsDb.doc('monuments/' + 'cl00001');

  }

  addReview(review, id){

    console.log('Review to add');
    console.log(review);

    this.monumentsDb.collection("monuments").doc(id).update({

      //review: this.monumentsDb.firestore.FieldValue.arrayRemove(review)
      review: firebase.firestore.FieldValue.arrayUnion(review);

    });

    // this.monumentsDb.collection("monuments").doc(id).set({

    //   reviews: [{

    //     comment: review.comment,
    //     rating: review.rating,
    //     userId: review.userId

    //   }]


    // });

  }

}
