/* Interações pequenas do portfólio. */
document.addEventListener("DOMContentLoaded", () => {
  // Fecha o menu móvel depois de escolher uma secção.
  const nav = document.querySelector("#mainNav");
  const navLinks = document.querySelectorAll("#mainNav .nav-link, #mainNav .btn");
  if (nav && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(nav).hide();
        }
      });
    });
  }

  // Revela elementos gradualmente ao entrar no ecrã; respeita preferências de movimento reduzido.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Formulário demonstrativo: valida os campos, mas nunca envia nem guarda dados.
  const form = document.querySelector("#contactForm");
  const formNote = document.querySelector("#formNote");
  if (form && formNote) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        formNote.textContent = "Falta preencher algum campo ou corrigir o email. Esta é apenas uma demonstração.";
        formNote.classList.remove("success");
        return;
      }
      formNote.textContent = "Muito bem! A validação de demonstração funcionou. Nenhum dado foi enviado ou guardado.";
      formNote.classList.add("success");
      form.reset();
      form.classList.remove("was-validated");
    });
  }
});
