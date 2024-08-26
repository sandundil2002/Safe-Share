import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
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
  const sanitizedUsername = storedUsername.replace(/[@.]/g, "_");
  const parts = storedUsername.split("@");

  $("#profileUsername").html(parts[0]);

  const firstLetter = parts[0].charAt(0).toUpperCase();
  const imgSrc = `/img/${firstLetter}.png`;
  $("#profilePic").attr("src", imgSrc);

  async function loadImages() {
    const imagesRef = ref(db, `users/${sanitizedUsername}/uploads`);
    const snapshot = await get(imagesRef);

    if (snapshot.exists()) {
      const uploads = snapshot.val();
      Object.keys(uploads).forEach((key) => {
        const { url, fileName } = uploads[key];

        if (url && url.trim() !== "") {
          console.log(url);

          const card = `
                    <div class="card" style="width: 18rem;" id="card-${key}">
                        <img src="${url}" class="card-img-top" alt="${fileName}">
                        <div class="card-body d-flex justify-content-between">
                            <p class="card-text text-center">
                                <a class="btn btn-sm btn-outline-primary fw-bold" href="#" role="button" onclick="copyLink('${url}')">Copy Link</a>
                            </p>
                            <p class="card-text text-center">
                                <a class="btn btn-sm btn-outline-danger fw-bold" href="#" role="button" onclick="deleteImage('${key}', '${fileName}', '${sanitizedUsername}')">Delete</a>
                            </p>
                        </div>
                    </div>`;

          $("#cardContainer").append(card);
        }
      });
    } else {
      console.log("No images found for this user.");
    }
  }

  window.copyLink = function (url) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        swal({
          title: "Link Copied!",
          text: "The image URL has been copied to the clipboard.",
          icon: "success",
          buttons: "OK",
        });
      })
      .catch((error) => {
        console.error("Failed to copy the link:", error);
      });
  };

  loadImages();

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

    $("#progressContainer").show();
    $("#progressBar").css("width", "0%").attr("aria-valuenow", 0);

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
      const storagePath = `uploads/${sanitizedUsername}/${finalFileName}`;
      const storageReference = storageRef(storage, storagePath);

      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(2)}% done`);
          $("#progressBar")
            .css("width", `${progress}%`)
            .attr("aria-valuenow", progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          swal({
            title: "Upload Failed!",
            text: error.message,
            icon: "error",
            buttons: "OK",
          });
          $("#progressContainer").hide();
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const card = `
                        <div class="card" style="width: 18rem;" id="card-${uniqueSuffix}">
                            <img src="${downloadURL}" class="card-img-top" alt="${finalFileName}">
                            <div class="card-body d-flex justify-content-between">
                                <p class="card-text text-center d-flex justify-content-between">
                                    <a class="btn btn-sm btn-outline-primary fw-bold" href="#" role="button" onclick="copyLink('${downloadURL}')">Copy Link</a>
                                </p>
                                <p class="card-text text-center">
                                    <a class="btn btn-sm btn-outline-danger fw-bold" href="#" role="button" onclick="deleteImage('${uniqueSuffix}', '${finalFileName}', '${sanitizedUsername}')">Delete</a>
                                </p>
                            </div>
                        </div>`;

          $("#cardContainer").append(card);

          window.copyLink = function (url) {
            navigator.clipboard
              .writeText(url)
              .then(() => {
                swal({
                  title: "Link Copied!",
                  text: "The image URL has been copied to the clipboard.",
                  icon: "success",
                  buttons: "OK",
                });
              })
              .catch((error) => {
                console.error("Failed to copy the link:", error);
              });
          };

          await set(
            ref(db, `users/${sanitizedUsername}/uploads/${uniqueSuffix}`),
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

          $("#progressContainer").hide();
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
      $("#progressContainer").hide();
    }
  });

  $("#signoutBtn").click(function () {
    window.location.href = "/index.html";
  });

  window.deleteImage = async function (
    uniqueSuffix,
    fileName,
    sanitizedUsername
  ) {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this image!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        const fileRef = storageRef(
          storage,
          `uploads/${sanitizedUsername}/${fileName}`
        );
        await deleteObject(fileRef);

        const dbRef = ref(
          db,
          `users/${sanitizedUsername}/uploads/${uniqueSuffix}`
        );
        await remove(dbRef);

        $(`#card-${uniqueSuffix}`).remove();

        swal("Deleted!", "Your image has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      swal(
        "Error!",
        "An unexpected error occurred while deleting the image.",
        "error"
      );
    }
  };
});
