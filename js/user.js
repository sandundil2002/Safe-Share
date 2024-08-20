import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

$(document).ready(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCDhvqoZJi8hUfBOtgRZP8Z7zklJ60cdrk",
    authDomain: "safe-share-d3d50.firebaseapp.com",
    databaseURL: "https://safe-share-d3d50-default-rtdb.firebaseio.com",
    projectId: "safe-share-d3d50",
    storageBucket: "safe-share-d3d50.appspot.com",
    messagingSenderId: "631799901190",
    appId: "1:631799901190:web:a5ddfb5d20a35944e5a787",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Set database variable
  const db = getDatabase();

  // Button click event
  $("#signBtn").click(function () {
    var email = $("#signEmail").val();
    var password = $("#signPassword").val();

    const uuid = crypto.randomUUID();

    set(ref(db, "users/" + uuid), {
      Email: email,
      Password: password,
    })
      .then(() => {
        alert("Saved");
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  });
});
