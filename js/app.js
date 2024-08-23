var loginPopup = document.getElementById("login-popup");
var signupPopup = document.getElementById("signup-popup");
var btnLogin = document.getElementById("login-btn");
var btnsignup = document.getElementById("signup-btn");
var span = document.getElementsByClassName("close-btn")[0];

const TypeWriter = function (txtElement, words, wait) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fulltxt = this.words[current];

  if (this.isDeleting) {
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = '<span class = "txt">' + this.txt + "</span>";

  let typeSpeed = 200;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.txt === fulltxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
  }

  setTimeout(() => this.type(), typeSpeed);
};

window.onload = function () {
  const txtElement = document.querySelector(".role");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);

  const txtElementFooter = document.querySelector(".footer");
  const wordsFooter = JSON.parse(txtElementFooter.getAttribute("data-words"));
  const waitFooter = txtElementFooter.getAttribute("data-wait");
  new TypeWriter(txtElementFooter, wordsFooter, waitFooter);
};

window.addEventListener("scroll", function (e) {
  let after = this.scrollY;
  if (after != 0) {
    nav.style.boxShadow = "0px 5px 15px black";
  } else {
    nav.style.boxShadow = "0px 0 0px black";
  }

  if (before < after) {
    if (pos > navHeight) {
      pos -= after - before;
      if (pos < navHeight) {
        pos = navHeight;
      }
      nav.style.top = pos + "px";
    }
  } else {
    if (pos < 0) {
      pos += before - after;
      if (pos > 0) {
        pos = 0;
      }
      nav.style.top = pos + "px";
    }
  }
  before = after;
});

btnLogin.onclick = function () {
  loginPopup.classList.add("show");

  setTimeout(() => {
    loginPopup.style.display = "block";
  }, 400);
};

btnsignup.onclick = function () {
  signupPopup.classList.add("show");

  setTimeout(() => {
    signupPopup.style.display = "block";
  }, 400);
};

span.onclick = function () {
  loginPopup.classList.remove("show");
  signupPopup.classList.remove("show");

  setTimeout(function () {
    loginPopup.style.display = "none";
    signupPopup.style.display = "none";
  }, 400);
};

window.onclick = function (event) {
  if (event.target == loginPopup) {
    loginPopup.classList.remove("show");
    signupPopup.classList.remove("show");

    setTimeout(function () {
      loginPopup.style.display = "none";
      signupPopup.style.display = "none";
    }, 400);
  }
};