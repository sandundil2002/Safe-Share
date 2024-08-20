const firebaseConfig = {
  apiKey: "AIzaSyCDhvqoZJi8hUfBOtgRZP8Z7zklJ60cdrk",
  authDomain: "safe-share-d3d50.firebaseapp.com",
  projectId: "safe-share-d3d50",
  storageBucket: "safe-share-d3d50.appspot.com",
  messagingSenderId: "631799901190",
  appId: "1:631799901190:web:a5ddfb5d20a35944e5a787",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

//Set database variable
var database = app.database()