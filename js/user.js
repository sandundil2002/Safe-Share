import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  child,
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

  const app = initializeApp(firebaseConfig);

  const db = getDatabase();

  $("#signBtn").click(function () {
    var email = $("#signEmail").val();
    var password = $("#signPassword").val();

    var users = {
      email: email,
      password: password,
    };

    if (checkValidation(users)) {
      const dbRef = ref(db);
      get(child(dbRef, "users"))
        .then((snapshot) => {
          let emailExists = false;

          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.Email === email) {
              emailExists = true;
            }
          });

          if (emailExists) {
            swal({
              title: "Signup Failed!",
              text: "This email is already registered.",
              icon: "error",
              button: "OK",
            });
          } else {
            const uuid = crypto.randomUUID();
            set(ref(db, "users/" + uuid), {
              Email: email,
              Password: password,
            })
              .then(() => {
                swal({
                  title: "Success",
                  text: "User registered successfully!",
                  icon: "success",
                  buttons: false,
                  timer: 2000,
                }).then(() => {
                  window.location.href = "./pages/homePage.html";
                });
              })
              .catch((error) => {
                alert("Error");
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  $("#loginBtn").click(function () {
    var username = $("#loginUsername").val();
    var password = $("#loginPassword").val();

    const dbRef = ref(db);
    get(child(dbRef, "users")).then((snapshot) => {
      if (snapshot.exists()) {
        let userFound = false;

        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();

          if (userData.Email === username && userData.Password === password) {
            userFound = true;
            localStorage.setItem("username", username);
            swal({
              title: "Login Successful!",
              text: "Redirecting to dashboard...",
              icon: "success",
              buttons: false,
              timer: 2000,
            }).then(() => {
              window.location.href = "./pages/homePage.html";
            });
          }
        });

        if (!userFound) {
          swal({
            title: "Login Failed!",
            text: "Invalid email or password.",
            icon: "error",
            button: "Try Again",
          });
        }
      } else {
        swal({
          title: "Login Failed!",
          text: "No users found. Please sign up first.",
          icon: "error",
          button: "OK",
        });
      }
    });
  });
});

function checkValidation(users) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^.{4,}$/;

  const isEmailValid = emailPattern.test(users.email);
  const isPasswordValid = passwordPattern.test(users.password);

  if (!isEmailValid) {
    swal({
      title: "Warning!",
      text: "Please Input A Valid Email Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isPasswordValid) {
    swal({
      title: "Warning!",
      text: "Please Input A Valid Password!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }
  return true;
}
