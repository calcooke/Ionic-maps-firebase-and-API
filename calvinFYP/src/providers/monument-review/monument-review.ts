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

  reviewToArray(monumentId, currentUserId){

    console.log("Delete the review in ", monumentId, "where the user id is ", currentUserId);

    // let reviewsArray  = [];

    // this.retrieveReview(monumentId, currentUserId).subscribe(docs => {
    //   reviewsArray =  docs.map(item => {
        
    //       return {
    //         id:  item.payload.doc.id,
    //         ...item.payload.doc.data()
    //       };
    //   }); 
    // });

    // this.deleteReview(reviewsArray)
  
  }


  deleteReview(reviewsArray){


    for(let i = 0; i < reviewsArray.length; i++){

      console.log(reviewsArray[i]);
      
    }

  }


  retrieveReview(monumentId, currentUserId){

    console.log("Delete the review in ", monumentId, "where the user id is ", currentUserId);
    // return this.monumentsDb.collection("monuments").doc('reviews').snapshotChanges();
    //console.log(this.monumentsDb.collection("monuments").snapshotChanges());
    //return this.monumentsDb.collection("monuments").doc(monumentId).snapshotChanges().toPromise().
    //return this.monumentsDb.collection("monuments").snapshotChanges();
    
    //this.monumentsDb.doc("monuments/"+monumentId).collection('reviews')
    //console.log(this.monumentsDb.doc("monuments/"+monumentId).collection('reviews'));
    //const col = this.monumentsDb.collection('monuments/' + monumentId, ref => ref.where('userId', '==', currentUserId));
    //const query = col.where('reviews', 'array-contains', 'userId');

    // let reviewsDb = [];

    // let fieldValues;

    // this.monumentsDb.collection("monuments").doc(monumentId).ref.get().then((querySnapshot) => {
    //     fieldValues = querySnapshot.
    //   }

    // this.monumentsDb.collection("monuments").ref.get().then((querySnapshot) => {
    //   fieldValues = querySnapshot.docs.map(doc => doc.data());
    // }

    //   let fieldValues = this.monumentsDb.collection("monuments").doc(monumentId).get()
    // .then(querySnapshot => {
    //   fieldValues = querySnapshot.docs.map(doc => doc.data())
    // })

    //const col = this.monumentsDb.collection("monuments").doc(monumentId);
    // let query = this.monumentsDb.collection("monuments").doc(monumentId);
    // console.log(query.reviews);

      // reviews:firebase.firestore.FieldValue.arrayRemove() 
      
    //     filter(reviews => reviews.userId !== currentUserId)
    //   })
    //  .catch(function(error) {
    //      console.error("Error removing document: ", error);
    //  });
      // reviewsDb =  col.subscribe().map(item => {
        
    //   return {
    //     id:  item.payload.doc.id,
    //     ...item.payload.doc.data()
    //   };
    // });    

// Remove the 'capital' field from the document
  // col.update({
  //   reviews: firebase.firestore.FieldValue.arrayRemove
  // });
    //console.log(col);    
  }

}