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

  $("#fileInput").change(async function () {
    const file = this.files[0];

    if (!file) {
      swal({
        title: "No File Selected!",
        text: "Please select a file to upload.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }

    try {
      const originalName = file.name;
      const extension = originalName.substring(
        originalName.lastIndexOf(".") + 1
      );

      const sanitizedFileName = originalName
        .substring(0, originalName.lastIndexOf("."))
        .replace(/\s+/g, "_")
        .replace(/[^\w\-]/g, "");

      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const uniqueSuffix = Math.random().toString(36).substring(2, 8);
      const finalFileName = `${sanitizedFileName}_${timestamp}_${uniqueSuffix}.${extension}`;

      const storagePath = `uploads/${storedUsername}/${finalFileName}`;
      const storageReference = storageRef(storage, storagePath);

      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(2)}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          swal({
            title: "Upload Failed!",
            text: error.message,
            icon: "error",
            buttons: "OK",
          });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("url" + downloadURL);

          await set(
            ref(db, `users/${storedUsername}/uploads/${uniqueSuffix}`),
            {
              originalName: originalName,
              fileName: finalFileName,
              url: downloadURL,
              uploadedAt: new Date().toISOString(),
            }
          );

          swal({
            title: "Upload Successful!",
            text: "Your file has been uploaded.",
            icon: "success",
            buttons: "OK",
          });
        }
      );
    } catch (error) {
      console.error("Error during upload process:", error);
      swal({
        title: "Error!",
        text: "An unexpected error occurred during the upload process.",
        icon: "error",
        buttons: "OK",
      });
    }
  });

  $("#signoutBtn").click(function () {
    window.location.href = "/index.html";
  });
});
