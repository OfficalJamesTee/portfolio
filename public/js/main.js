document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    body.classList.add("dark-mode")
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    // Save theme preference
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light")
  })

  // Tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      this.classList.add("active")
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    }

    // Add a success message element if it doesn't exist
    let successMessage = document.getElementById("form-success-message")
    if (!successMessage) {
      successMessage = document.createElement("div")
      successMessage.id = "form-success-message"
      successMessage.className = "form-success-message"
      successMessage.style.display = "none"
      contactForm.appendChild(successMessage)
    }

    // Send form data to server
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show success message instead of alert
          successMessage.textContent = "Message sent successfully!"
          successMessage.style.display = "block"
          successMessage.className = "form-success-message success"
          contactForm.reset()

          // Hide the message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none"
          }, 5000)
        } else {
          // Show error message
          successMessage.textContent = "Something went wrong. Please try again."
          successMessage.style.display = "block"
          successMessage.className = "form-success-message error"
        }
      })
      .catch((error) => {
        console.error("Error:")
        // console.error("Error:", error);
        // Show error message
        successMessage.textContent = "An error occurred. Please try again later."
        successMessage.style.display = "block"
        successMessage.className = "form-success-message error"
      })
  })

  // Add animation on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll(".section")

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = "1"
        section.style.transform = "translateY(0)"
      }
    })
  }

  // Initial styles for animation
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // WhatsApp text that disappears after 2 minutes
  const whatsappContainer = document.querySelector(".whatsapp-container")
  const callout = document.querySelector(".callout")

  if (whatsappContainer && callout) {
    // Set the text content
    callout.innerHTML = "Chat me on WhatsApp"

    // Make the text disappear after 2 minutes
    setTimeout(
      () => {
        whatsappContainer.style.display = "none"
      },
      2 * 60 * 1000,
    ) // 2 minutes in milliseconds
  }
})

