/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () { headerShadow() };

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Verifica se o elemento existe antes de inicializar
  const typedElement = document.querySelector(".typedText");
  if (typedElement && typeof Typed !== 'undefined') {
    new Typed(".typedText", {
      strings: ["Estrategista de Negócios", "Programador"],
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000,
      loop: true
    });
  } else {
    console.warn("Typed.js not loaded or element not found");
  }
});

/* ----- SCROLL REVEAL ANIMATION ----- */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    /* -- HOME -- */
    sr.reveal('.featured-text-card', {});
    sr.reveal('.featured-name', { delay: 100 });
    sr.reveal('.featured-text-info', { delay: 200 });
    sr.reveal('.featured-text-btn', { delay: 200 });
    sr.reveal('.social_icons', { delay: 200 });
    sr.reveal('.featured-image', { delay: 300 });

    /* -- PROJECT BOX -- */
    sr.reveal('.project-box', { interval: 200 });

    /* -- HEADINGS -- */
    sr.reveal('.top-header', {});

    const srLeft = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srLeft.reveal('.about-info', { delay: 100 });
    srLeft.reveal('.contact-info', { delay: 100 });

    const srRight = ScrollReveal({
      origin: 'right',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srRight.reveal('.skills-box', { delay: 100 });
    srRight.reveal('.form-control', { delay: 100 });
  }
});

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id');

    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active-link');
      } else {
        navLink.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

/* ----- RESPONSIVE LAYOUT ----- */
function adjustLayout() {
  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-view');
  } else {
    document.body.classList.remove('mobile-view');
  }
}

window.addEventListener('resize', adjustLayout);
window.addEventListener('load', adjustLayout);

/* ----- FORM SUBMISSION (IF FORM EXISTS) ----- */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const nome = form.querySelector('.input-field[name="nome"]').value;
      const email = form.querySelector('.input-field[name="email"]').value;
      const mensagem = form.querySelector('textarea[name="mensagem"]').value;

      fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&mensagem=${encodeURIComponent(mensagem)}`
      }).then(response => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          response.text().then(text => {
            alert('Erro ao enviar mensagem: ' + text);
          });
        }
      }).catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      });
    });
  }
});