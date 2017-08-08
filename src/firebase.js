import firebase from 'firebase';

var config = {
  //COPY YOUR API HERE
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const fb = new firebase.auth.FacebookAuthProvider();
export const db = firebase.database();
