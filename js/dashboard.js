$(document).ready(function () {
  const storedUsername = localStorage.getItem("username");
  const parts = storedUsername.split("@");

  $("#profileUsername").html(parts[0]);

  const firstLetter = parts[0].charAt(0).toUpperCase();

  const imgSrc = `/img/${firstLetter}.png`;
  $("#profilePic").attr("src", imgSrc);

  $("#signout-btn").click(function () {
    window.location.href = "/index.html";
  });
});
