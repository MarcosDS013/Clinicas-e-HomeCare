const loadScreen = document.querySelector(".load-screen");
const logo = document.querySelector(".logo img");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadScreen.style.opacity = "0";

    setTimeout(() => {
      loadScreen.style.display = "none";

      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    });
  }, 1000);
});

//===================== MENU EFFECTS ===============================

//=================> MOUSE TRACKER
const tracker = document.querySelector(".mouse-tracker");
window.addEventListener("mousemove", mouseTracker);
let scrollY0 = 0;
let y = 0;

function mouseTracker(e) {
  const x = e.clientX;
  y = e.clientY;
  tracker.style.left = x + "px";
  tracker.style.top = y + scrollY + "px";
}

//=====================

const menuBtn = document.querySelector(".btn");
const menu = document.querySelector(".menu");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("menu-open");
  menuBtn.parentElement.classList.toggle("menu-btn-open");
  menuOpen = !menuOpen;
});

menuBtn.addEventListener("mouseenter", () => {
  tracker.classList.add("tracker-menu");

  if (!menuOpen) {
    tracker.innerHTML = `Abrir Menu`;
  }
});

menuBtn.addEventListener("mouseleave", () => {
  tracker.classList.remove("tracker-menu");
  tracker.innerHTML = "";
});

// ================= ANCORAS DO MENU ====================

// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll(".menu a");

// Função para fechar o menu
function closeMenu() {
  menu.classList.remove("menu-open");
  menuBtn.parentElement.classList.remove("menu-btn-open");
  menuOpen = false;
}

// Adiciona um evento de clique a cada link do menu
menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Impede o comportamento padrão do link (evita a navegação)
    event.preventDefault();

    // Fecha o menu
    closeMenu();

    // Obtém o destino da âncora do link
    const targetId = link.getAttribute("href").substring(1); // Remove o '#'

    // Encontra o elemento com o ID correspondente
    const targetElement = document.getElementById(targetId);

    // Verifica se o elemento de destino existe
    if (targetElement) {
      // Rola até o elemento de destino
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ================ TEXT TOP OUTPUT =======================

const output = document.querySelector(".output");
const btn = document.querySelector(".btn");
const header = document.querySelector("header");

let res;
let typeSpeed = 200;
let removeSpeed = 100;
let id = 0;

const words = [
  "Internação Domiciliar",
  "Assistência Domiciliar",
  "Emergências Médicas",
];

const colors = ["#0e8eab", "#56b847", "red"];

const backgrounds = ["images/2-pexels-anna-shvets.jpg"];

let charCount = 0;
const pauseTime = 10;
let time;

function type() {
  res = words[id].substring(0, charCount);
  output.style.color = colors[id];
  btn.style.backgroundColor = `url(${backgrounds[id]})`;

  if (charCount >= words[id].length + pauseTime) {
    clearInterval(time);
    charCount = 1;
    time = setInterval(remove, removeSpeed);
  }

  output.innerHTML = res;
  charCount++;
}

function remove() {
  res = words[id].substring(0, words[id].length - charCount);

  if (res.length <= 0) {
    id = (id + 1) % words.length;
    clearInterval(time);
    charCount = 0;
    time = setInterval(type, typeSpeed);
  }

  output.innerHTML = res;
  charCount++;
}

// Iniciar o processo de digitação automaticamente
time = setInterval(type, typeSpeed);

// ========================= COUNTERS ======================
const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");

// Usando Intersection Observer para detectar quando o elemento está visível
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // O elemento está visível
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count"));

        // Usando um loop para animar o contador
        let count = 0;
        function updateCount() {
          if (count < target) {
            count++;
            counter.innerText = count;

            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        }

        updateCount();
      });
    } else {
      // O elemento não está visível
      counters.forEach((counter) => {
        counter.innerText = 0;
      });
    }
  });
});

observer.observe(container);

// ============= FAQ expandable =================
const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) =>
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");

    const icon = faq.querySelector(".faq_icon i");
    if (icon.className === "bx bx-plus-circle") {
      icon.className = "bx bx-minus-circle";
    } else {
      icon.className = "bx bx-plus-circle";
    }
  })
);

//========================= COOKIES ==========================

let popUp = document.getElementById("cookie-msg");

document.getElementById("aceitar-cookie").addEventListener("click", () => {
  popUp.classList.remove("show");
});

const checkCookie = () => {
  if (document.cookie.includes("myCookieName")) {
    popUp.classList.remove("hide");
  } else {
    popUp.classList.add("show");
  }
};

window.onload = () => {
  checkCookie();
};

// =========> POLICY
const toggleButton = document.getElementById("toggle-button");
const hiddenText = document.querySelector(".hidden-text");

toggleButton.addEventListener("click", function () {
  if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
    hiddenText.style.display = "block";
    toggleButton.textContent = "Mostrar menos";
  } else {
    hiddenText.style.display = "none";
    toggleButton.textContent = "Mostrar mais";
  }
});

//=============================== PANELS ===============================
//====================================================

const panels = document.querySelectorAll(".panel");
const panelsContainer = document.querySelector(".panels");
const descriptions = document.querySelectorAll(".description > div");
const backBtn = document.querySelector(".back-btn");

//=======> HOVER EFFECT
panels.forEach((panel) => {
  panel.addEventListener("mouseenter", () => {
    panels.forEach((panel) => {
      panel.classList.add("panel-inactive");
    });
    panel.classList.remove("panel-inactive");
  });
  panel.addEventListener("mouseleave", () => {
    panels.forEach((panel) => {
      panel.classList.remove("panel-inactive");
    });
  });
});

//=======> CLICK OPEN EFFECT
panels.forEach((panel, i) => {
  panel.addEventListener("click", () => {
    panels.forEach((panel) => {
      panel.classList.add("panel-hidden");
      setTimeout(() => {
        panel.style.display = "none";
      }, 400);
    });
    setTimeout(() => {
      panel.classList.remove("panel-hidden");
      panel.style.display = "flex";
      panel.classList.add("panel-active");
      panelsContainer.style.display = "block";
      descriptions.forEach((description) => {
        description.classList.remove("description-active");
      });
      descriptions[i].classList.add("description-active");
      backBtn.style.display = "block";
    }, 400);
  });
});

//=======> CLICK CLOSE EFFECT
backBtn.addEventListener("click", () => {
  panels.forEach((panel) => {
    panel.classList.remove("panel-hidden");
    panel.classList.remove("panel-active");
    setTimeout(() => {
      panel.style.display = "flex";
      panelsContainer.style.display = "grid";
    }, 400);
    descriptions.forEach((description) => {
      description.classList.remove("description-active");
    });
    backBtn.style.display = "none";
  });
});

//======================== SCROLL REVEAL =============================
const sr = ScrollReveal({
  distance: "85px",
  duration: 2500,
  reset: true,
  delay: 400,
});

sr.reveal(".logo", { origin: "left" });
sr.reveal(".hero", { origin: "bottom" });
sr.reveal(".actuation-box", { origin: "bottom" });
sr.reveal(".header-text", { origin: "right" });

var items = document.querySelectorAll(".row");
var current = 0;

function nextItem() {
  if (current >= items.length) {
    current = 0;
  }

  items[current].classList.add("active");
  items[current - 1].classList.remove("active");

  current++;
}

document.querySelector(".next").addEventListener("click", nextItem);
