import firebase from 'firebase';

var config = {
  //API KEY HERE
};

firebase.initializeApp(config);

export const auth = firebase.auth();
