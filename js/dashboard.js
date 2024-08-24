import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

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
  const storage = getStorage();

  const storedUsername = localStorage.getItem("username");
  const parts = storedUsername.split("@");

  $("#profileUsername").html(parts[0]);

  const firstLetter = parts[0].charAt(0).toUpperCase();
  const imgSrc = `/img/${firstLetter}.png`;
  $("#profilePic").attr("src", imgSrc);

  $("#fileInput").change(function () {
    const file = $("#fileInput")[0].files[0];

    if (file) {
      const storageReference = storageRef(
        storage,
        `uploads/${storedUsername}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Monitor upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed:", error);
        },
        () => {
          // Handle successful uploads
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            set(ref(db, `users/${storedUsername}/uploads/${file.name}`), {
              url: downloadURL,
              fileName: file.name,
            })
              .then(() => {
                swal({
                  title: "Upload Successful!",
                  text: "Your file has been uploaded.",
                  icon: "success",
                  buttons: "OK",
                });
              })
              .catch((error) => {
                swal({
                  title: "Error!",
                  text: "Failed to save file information.",
                  icon: "error",
                  buttons: "Try Again",
                });
                console.error("Failed to save file info:", error);
              });
          });
        }
      );
    } else {
      swal({
        title: "No File Selected!",
        text: "Please select a file to upload.",
        icon: "warning",
        buttons: "OK",
      });
    }
  });

  $("#signoutBtn").click(function () {
    window.location.href = "/index.html";
  });
});
