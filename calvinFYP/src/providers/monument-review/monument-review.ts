import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';


import * as firebase from 'firebase/app';

/*
  Generated class for the MonumentReviewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonumentReviewProvider {

  

  constructor(public http: HttpClient,  public monumentsDb:AngularFirestore) {
    console.log('Monument review service injected');
  }

  getReview(id){

   return this.monumentsDb.collection("monuments").doc(id).snapshotChanges();

  }

  addReview(review, id){

    //let docId:string = id;
    let docId:string = id.id;

    console.log('Monument review service is updating the monument ', docId );
    console.log("With the following review: ", review);
    

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

  editReview(monumentId, review) {
    console.log("Need to update ",monumentId, " where current user ID == ", review.userId)
    //this.monumentsDb.doc("monuments/"+id).update(review);
  }

  deleteReview(monumentId, currentUserId){
    console.log("Delete the review in ", monumentId, "where the user id is ", currentUserId);
    //this.monumentsDb.doc("monuments/"+monumentId).collection('reviews')
    console.log(this.monumentsDb.doc("monuments/"+monumentId).collection('reviews'));
  }

}