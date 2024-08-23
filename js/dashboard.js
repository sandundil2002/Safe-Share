$(document).ready(function () {
  const storedUsername = localStorage.getItem("username");
  const parts = storedUsername.split("@")
  
  $("#profileUsername").html(parts[0]);
  
  $("#signout-btn").click(function () {
     window.location.href = "/index.html";
  });
});