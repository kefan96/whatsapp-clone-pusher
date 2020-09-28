import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCajpj_BZZmV0TEBSaDt2VNplk7-xbIe_w",
    authDomain: "whatsapp-mern-4ec15.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-4ec15.firebaseio.com",
    projectId: "whatsapp-mern-4ec15",
    storageBucket: "whatsapp-mern-4ec15.appspot.com",
    messagingSenderId: "195432292433",
    appId: "1:195432292433:web:172bea3856906f227b9870",
    measurementId: "G-YTGH8SHMPB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }