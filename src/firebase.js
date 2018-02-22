import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAN4EeBEOJ4qpb1uHJrg2D7wPohjsKtao4',
  authDomain: 'authentication-86805.firebaseapp.com',
  databaseURL: 'https://authentication-86805.firebaseio.com',
  projectId: 'authentication-86805',
  storageBucket: 'authentication-86805.appspot.com',
  messagingSenderId: '1025512692174'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
