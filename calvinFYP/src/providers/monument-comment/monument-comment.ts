import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';


import * as firebase from 'firebase/app';


@Injectable()
export class MonumentCommentProvider {

  // "rxjs": "^6.4.0",
  //   "rxjs-compat": "^6.4.0",

  constructor(public http: HttpClient,  public monumentsDb:AngularFirestore) {
    console.log('Hello MonumentCommentProvider Provider');
  }

  getReview(id){

   return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();

  }

  addReview(review, id){

    let docId:string = id.id;

    console.log('Calling the arrayUnion function with the review');
    console.log(review);
    console.log("And the ID being passed with it is");
    console.log(docId);

    /*
    this.monumentsDb.collection("monuments").doc(docId).set(review).then( function(d) {
      console.log("Just created a new document with id " + docId);
    })
    .catch( function(err){
      console.log("Document already exists so updating with new review");
      this.monumentsDb.collection("monuments").doc(id.id).update({
        reviews: firebase.firestore.FieldValue.arrayUnion(review)    
      });
    })
    */

    /*
    let docRef = this.monumentsDb.collection("monuments").doc(id.id).snapshotChanges().toPromise().then( function(doc){
      if (!doc.payload.exists)
      {
        this.monumentsDb.collection("monuments").doc(docId).set(review);
      }
      else
      {
        this.monumentsDb.collection("monuments").doc(id.id).update({
          reviews: firebase.firestore.FieldValue.arrayUnion(review)    
        });
      }
    })
    */
    
    this.monumentsDb.collection("monuments").doc(id.id). snapshotChanges().subscribe(doc => {
       
      if (!doc.payload.exists)
      {

        this.monumentsDb.collection("monuments").doc(docId).set({});
      }
      else{
        this.monumentsDb.collection("monuments").doc(id.id).update({

          reviews: firebase.firestore.FieldValue.arrayUnion(review)
    
        });
      }

    });
    
    


    //review: this.monumentsDb.firestore.FieldValue.arrayRemove(review)

    // this.monumentsDb.collection("monuments").doc(id).set({

    //   reviews: [{

    //     comment: review.comment,
    //     rating: review.rating,
    //     userId: review.userId

    //   }]


    // });

  }

}
