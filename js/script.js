// ***------Skills Animation------***

const skills = document.querySelectorAll(".skill");
const styles = document.styleSheets[0];
const aboutSection = document.querySelector("#about-section");

const sectionObserverSkills = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skills.forEach(skill => {
      const skillValue = skill.querySelector(".skill-detail").getAttribute("data-bs-skill");
      const progress = skill.querySelector(".progress");
      const animation = progress.getAnimations()[0];

      const animationName = `progress-bar-${Date.now()}`;
      const keyframes = `
      @keyframes ${animationName} {
        from { width: 0; }
        to { width: ${skillValue}; }
      }
    `;
      // Insert the keyframes rule
      styles.insertRule(keyframes, styles.cssRules.length);

      // Apply the animation to the element
      progress.style.animationName = animationName;
      progress.style.animationDuration = "1s";
      progress.style.animationTimingFunction = "ease";
      progress.style.animationIterationCount = "1";

    })
  }
}, { threshold: 0.75 })

sectionObserverSkills.observe(aboutSection);


// ***------Section NavLinks in Navbar------***

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.getAttribute("id");
    const screenWidth = window.innerWidth;

    const correspondingNavItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (entry.isIntersecting && screenWidth >= 992) {
      correspondingNavItem.classList.add("active");
    } else {
      correspondingNavItem.classList.remove("active");
    }
  });
}, { threshold: 0.5 });

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  sectionObserver.observe(section);
});



// ***------Navigation------***
//On Mobile
const navToggler = document.querySelector("#toggle-bar");
const navbarToggle = document.querySelector(".navbar-toggle");
navToggler.addEventListener("click", () => {
  navbarToggle.classList.toggle("navbar--active");
})

// Open-Close Navigation while Scrolling
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
  console.log(window.scrollY);
  if (window.scrollY > 100 && window.scrollY > this.lastScrollTop) {
    header.style.top = "-20%";
  } else {
    header.style.top = "0%";
  }
  this.lastScrollTop = window.scrollY;

  // for mobile-only
  navbarToggle.classList.remove("navbar--active");
});

// ***------Dynamic Writing------***
const textContainer = document.getElementById('dynamic-container');
const strings = ['Web Developer', 'Front-End Developer', 'Back-End Developer'];
let stringIndex = 0;
let index = 0;
let isDeleting = false;

function typeEffect() {
  const speed = 100; // Adjust the typing speed (in milliseconds)
  const delay = isDeleting ? speed / 4 : speed;

  const currentString = strings[stringIndex];
  const currentText = currentString.substring(0, index);

  if (!isDeleting && index === currentString.length) {
    // Start deleting after the string is fully typed
    setTimeout(() => {
      isDeleting = true;
    }, 500);
  }

  if (isDeleting && index === 0) {
    // Stop deleting and move to the next string
    isDeleting = false;
    stringIndex = (stringIndex + 1) % strings.length;
  }

  textContainer.textContent = currentText;

  if (isDeleting) {
    index--;
  } else {
    index++;
  }

  setTimeout(typeEffect, delay);
}
// Start the typing effect
typeEffect();


// ***------Footer------***
// currentYear
try {
  currentYear.innerText = new Date().getFullYear();
} catch (error) {}