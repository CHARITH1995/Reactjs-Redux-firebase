import * as firebase from 'firebase';

const firebaseConfig = {
  // use your firbase configurations
  };

  firebase.initializeApp( firebaseConfig );

  export const database = firebase.database().ref('/notes');