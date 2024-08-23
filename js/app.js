$(document).ready(function () {
  var $loginPopup = $("#login-popup");
  var $signupPopup = $("#signup-popup");
  var $btnLogin = $("#login-btn");
  var $btnSignup = $("#signup-btn");
  var $closeBtn = $(".close-btn");

  class TypeWriter {
    constructor(txtElement, words, wait) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

    type() {
      const current = this.wordIndex % this.words.length;
      const fulltxt = this.words[current];

      if (this.isDeleting) {
        this.txt = fulltxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fulltxt.substring(0, this.txt.length + 1);
      }

      this.txtElement.html('<span class="txt">' + this.txt + "</span>");

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
    }
  }

  $(window).on("load", function () {
    const $txtElement = $(".role");
    const words = JSON.parse($txtElement.attr("data-words"));
    const wait = $txtElement.attr("data-wait");
    new TypeWriter($txtElement, words, wait);
  });

  var before = 0;
  var pos = 0;
  const navHeight = $("nav").outerHeight();
  const $nav = $("nav");

  $(window).on("scroll", function () {
    let after = $(this).scrollTop();

    if (after !== 0) {
      $nav.css("box-shadow", "0px 5px 15px black");
    } else {
      $nav.css("box-shadow", "0px 0 0px black");
    }

    if (before < after) {
      if (pos > navHeight) {
        pos -= after - before;
        if (pos < navHeight) {
          pos = navHeight;
        }
        $nav.css("top", pos + "px");
      }
    } else {
      if (pos < 0) {
        pos += before - after;
        if (pos > 0) {
          pos = 0;
        }
        $nav.css("top", pos + "px");
      }
    }
    before = after;
  });

  $btnLogin.on("click", function () {
    $loginPopup.addClass("show");

    setTimeout(() => {
      $loginPopup.show();
    }, 400);
  });

  $btnSignup.on("click", function () {
    $signupPopup.addClass("show");

    setTimeout(() => {
      $signupPopup.show();
    }, 400);
  });

  $closeBtn.on("click", function () {
    $loginPopup.removeClass("show");
    $signupPopup.removeClass("show");

    setTimeout(function () {
      $loginPopup.hide();
      $signupPopup.hide();
    }, 400);
  });

  $(window).on("click", function (event) {
    if (event.target === $loginPopup[0] || event.target === $signupPopup[0]) {
      $loginPopup.removeClass("show");
      $signupPopup.removeClass("show");

      setTimeout(function () {
        $loginPopup.hide();
        $signupPopup.hide();
      }, 400);
    }
  });
});
