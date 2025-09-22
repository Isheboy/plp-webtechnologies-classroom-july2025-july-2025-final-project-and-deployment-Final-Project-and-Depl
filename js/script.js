// script.js - Enhanced Portfolio Interactivity with Modern UX

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Enhancement
  const hamburger = document.getElementById("hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close mobile menu when clicking on links
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }

  // Enhanced Scroll Animations with Stagger Effect
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 100); // Stagger animations
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll(".fade-in, .slide-in").forEach((el) => {
    animationObserver.observe(el);
  });

  // Active Navigation Link Highlighting
  const navLinksItems = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinksItems.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Enhanced Form Validation with Real-time Feedback
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");

    // Real-time validation
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearErrors);
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      let isValid = true;

      // Validate each field
      if (!validateField({ target: contactForm.name, skipAlert: true }))
        isValid = false;
      if (!validateField({ target: contactForm.email, skipAlert: true }))
        isValid = false;
      if (!validateField({ target: contactForm.message, skipAlert: true }))
        isValid = false;

      if (isValid) {
        showSuccessMessage();
        contactForm.reset();
        inputs.forEach((input) => clearFieldError(input));
      }
    });

    function validateField(e) {
      const field = e.target;
      const value = field.value.trim();
      const fieldName = field.name;

      clearFieldError(field);

      if (!value) {
        showFieldError(
          field,
          `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`
        );
        return false;
      }

      if (fieldName === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        showFieldError(field, "Please enter a valid email address");
        return false;
      }

      if (fieldName === "message" && value.length < 10) {
        showFieldError(field, "Message should be at least 10 characters long");
        return false;
      }

      return true;
    }

    function clearErrors(e) {
      clearFieldError(e.target);
    }

    function showFieldError(field, message) {
      field.style.borderColor = "#ef4444";
      field.style.backgroundColor = "#fef2f2";

      let errorElement = field.parentNode.querySelector(".error-message");
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "#ef4444";
        errorElement.style.fontSize = "0.875rem";
        errorElement.style.marginTop = "0.25rem";
        field.parentNode.appendChild(errorElement);
      }
      errorElement.textContent = message;
    }

    function clearFieldError(field) {
      field.style.borderColor = "";
      field.style.backgroundColor = "";

      const errorElement = field.parentNode.querySelector(".error-message");
      if (errorElement) {
        errorElement.remove();
      }
    }

    function showSuccessMessage() {
      const successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.innerHTML = `
        <div style="background: #dcfce7; border: 1px solid #16a34a; color: #166534; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
          ✅ Thank you for your message! I'll get back to you soon.
        </div>
      `;

      contactForm.insertBefore(successDiv, contactForm.firstChild);

      setTimeout(() => {
        successDiv.remove();
      }, 5000);
    }
  }

  // Projects page - no additional dynamic loading needed
  // All projects are now statically defined in the HTML
});

// Animation classes for scroll
// These are added dynamically
// .fade-in-animate { opacity: 1 !important; transform: none !important; transition: opacity 0.7s, transform 0.7s; }
// .slide-in-animate { opacity: 1 !important; transform: none !important; transition: opacity 0.7s, transform 0.7s; }
