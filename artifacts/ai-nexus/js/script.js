/* ============================================
   AI Nexus — global script
   - Mobile nav toggle
   - Active nav link highlight
   - Footer year
   - Login form validation
   - Contact form validation
   ============================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    highlightActiveNav();
    setFooterYear();
    initLoginForm();
    initContactForm();
  });

  /* ---------- Mobile nav toggle ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is tapped (mobile UX)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link ---------- */
  function highlightActiveNav() {
    var path = window.location.pathname;
    var current = "home";
    if (path.indexOf("/pages/") !== -1) {
      var file = path.split("/").pop() || "";
      current = file.replace(".html", "") || "home";
    }
    document.querySelectorAll(".nav-link").forEach(function (link) {
      if (link.getAttribute("data-nav") === current) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- Footer year ---------- */
  function setFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Helpers ---------- */
  function setError(fieldEl, errorEl, message) {
    if (!fieldEl || !errorEl) return;
    fieldEl.classList.add("invalid");
    errorEl.textContent = message;
  }

  function clearError(fieldEl, errorEl) {
    if (!fieldEl || !errorEl) return;
    fieldEl.classList.remove("invalid");
    errorEl.textContent = "";
  }

  function isValidEmail(value) {
    // Pragmatic email regex — enough for client-side validation.
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(value).trim());
  }

  function showFeedback(el, message, type) {
    if (!el) return;
    el.className = "feedback " + (type || "success");
    el.textContent = message;
  }

  function hideFeedback(el) {
    if (!el) return;
    el.className = "feedback";
    el.textContent = "";
  }

  /* ---------- Login form ---------- */
  function initLoginForm() {
    var form = document.getElementById("loginForm");
    if (!form) return;

    var emailInput = form.querySelector("#email");
    var passwordInput = form.querySelector("#password");
    var emailField = emailInput.closest(".field");
    var passwordField = passwordInput.closest(".field");
    var emailError = form.querySelector("#emailError");
    var passwordError = form.querySelector("#passwordError");
    var feedback = document.getElementById("loginFeedback");

    // Live clearing of errors as user types
    emailInput.addEventListener("input", function () {
      clearError(emailField, emailError);
      hideFeedback(feedback);
    });
    passwordInput.addEventListener("input", function () {
      clearError(passwordField, passwordError);
      hideFeedback(feedback);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;

      var email = emailInput.value.trim();
      var password = passwordInput.value;

      if (!email) {
        setError(emailField, emailError, "Email is required.");
        ok = false;
      } else if (!isValidEmail(email)) {
        setError(emailField, emailError, "Please enter a valid email address.");
        ok = false;
      } else {
        clearError(emailField, emailError);
      }

      if (!password) {
        setError(passwordField, passwordError, "Password is required.");
        ok = false;
      } else if (password.length < 6) {
        setError(
          passwordField,
          passwordError,
          "Password must be at least 6 characters."
        );
        ok = false;
      } else {
        clearError(passwordField, passwordError);
      }

      if (!ok) {
        showFeedback(feedback, "Please fix the highlighted fields.", "error");
        return;
      }

      showFeedback(
        feedback,
        "Welcome back! You've signed in as " + email + ".",
        "success"
      );
      form.reset();
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var nameInput = form.querySelector("#name");
    var emailInput = form.querySelector("#cemail");
    var messageInput = form.querySelector("#message");

    var nameField = nameInput.closest(".field");
    var emailField = emailInput.closest(".field");
    var messageField = messageInput.closest(".field");

    var nameError = form.querySelector("#nameError");
    var emailError = form.querySelector("#cemailError");
    var messageError = form.querySelector("#messageError");

    var feedback = document.getElementById("contactFeedback");

    nameInput.addEventListener("input", function () {
      clearError(nameField, nameError);
      hideFeedback(feedback);
    });
    emailInput.addEventListener("input", function () {
      clearError(emailField, emailError);
      hideFeedback(feedback);
    });
    messageInput.addEventListener("input", function () {
      clearError(messageField, messageError);
      hideFeedback(feedback);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var message = messageInput.value.trim();

      if (!name) {
        setError(nameField, nameError, "Name is required.");
        ok = false;
      } else if (name.length < 2) {
        setError(nameField, nameError, "Name must be at least 2 characters.");
        ok = false;
      } else {
        clearError(nameField, nameError);
      }

      if (!email) {
        setError(emailField, emailError, "Email is required.");
        ok = false;
      } else if (!isValidEmail(email)) {
        setError(emailField, emailError, "Please enter a valid email address.");
        ok = false;
      } else {
        clearError(emailField, emailError);
      }

      if (!message) {
        setError(messageField, messageError, "Message cannot be empty.");
        ok = false;
      } else if (message.length < 10) {
        setError(
          messageField,
          messageError,
          "Please write at least 10 characters so we know how to help."
        );
        ok = false;
      } else {
        clearError(messageField, messageError);
      }

      if (!ok) {
        showFeedback(feedback, "Please correct the errors above.", "error");
        return;
      }

      showFeedback(
        feedback,
        "Thanks, " + name + "! Your message has been received.",
        "success"
      );
      form.reset();
    });
  }
})();
