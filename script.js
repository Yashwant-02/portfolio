/**
 * Renders the portfolio from window.PORTFOLIO_DATA (data.js).
 * No content is hard-coded here — edit data.js, not this file.
 *
 * Security note: all data-driven strings are inserted with textContent /
 * DOM APIs, never innerHTML, so nothing in data.js can execute as markup.
 */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO_DATA || {};

  /* ---------------------------------------------------------------------
     small DOM helpers
     --------------------------------------------------------------------- */
  function el(tag, opts) {
    opts = opts || {};
    var node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html; // only ever used with static, developer-authored icon markup below
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) {
        node.setAttribute(k, opts.attrs[k]);
      });
    }
    return node;
  }

  function icon(name) {
    var icons = {
      linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    };
    return icons[name] || "";
  }

  /* ---------------------------------------------------------------------
     THEME (dark/light, persisted in localStorage — no sensitive data)
     --------------------------------------------------------------------- */
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("portfolio-theme"); } catch (e) { /* storage unavailable */ }
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    var toggle = document.getElementById("theme-toggle");
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* storage unavailable */ }
    });
  })();

  /* ---------------------------------------------------------------------
     MOBILE NAV
     --------------------------------------------------------------------- */
  (function initNav() {
    var burger = document.getElementById("hamburger");
    var links = document.getElementById("nav-links");
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  })();

  /* ---------------------------------------------------------------------
     RENDER: hero
     --------------------------------------------------------------------- */
  function renderHero() {
    var p = DATA.profile || {};
    document.getElementById("hero-name").textContent = p.name || "";
    document.getElementById("hero-title").textContent = p.title || "";
    document.getElementById("hero-tagline").textContent = p.tagline || p.objective || "";
    document.title = (p.name ? p.name + " | " : "") + (p.title || "");

    var resumeBtns = [document.getElementById("hero-resume-btn"), document.getElementById("about-resume-link")];
    resumeBtns.forEach(function (btn) {
      if (!btn) return;
      if (p.resumeFile) { btn.href = p.resumeFile; } else { btn.style.display = "none"; }
    });

    var social = document.getElementById("hero-social");
    social.innerHTML = "";
    if (p.linkedin) social.appendChild(makeSocialBtn("linkedin", p.linkedin, "LinkedIn"));
    if (p.github) social.appendChild(makeSocialBtn("github", p.github, "GitHub"));
    if (p.email) social.appendChild(makeSocialBtn("mail", "mailto:" + p.email, "Email"));

    var tagWrap = document.getElementById("hero-panel-tags");
    (DATA.skills || []).slice(0, 4).forEach(function (group) {
      (group.items || []).slice(0, 1).forEach(function (item) {
        tagWrap.appendChild(el("span", { class: "tag", text: item }));
      });
    });

    document.getElementById("footer-name").textContent =
      "© " + new Date().getFullYear() + " " + (p.name || "");
  }

  function makeSocialBtn(name, href, label) {
    var a = el("a", { class: "social-btn", attrs: { href: href, "aria-label": label, target: "_blank", rel: "noopener noreferrer" } });
    if (name === "mail") { a.target = ""; a.removeAttribute("target"); }
    a.innerHTML = icon(name);
    return a;
  }

  /* ---------------------------------------------------------------------
     RENDER: about
     --------------------------------------------------------------------- */
  function renderAbout() {
    var p = DATA.profile || {};
    document.getElementById("about-objective").textContent = p.objective || "";
    document.getElementById("about-location").textContent = p.location || "—";
  }

  /* ---------------------------------------------------------------------
     RENDER: skills
     --------------------------------------------------------------------- */
  function renderSkills() {
    var wrap = document.getElementById("skills-grid");
    wrap.innerHTML = "";
    (DATA.skills || []).forEach(function (group) {
      var card = el("div", { class: "skill-card reveal" });
      card.appendChild(el("h3", { text: group.category }));
      var chips = el("div", { class: "skill-chips" });
      (group.items || []).forEach(function (item) {
        chips.appendChild(el("span", { class: "chip", text: item }));
      });
      card.appendChild(chips);
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: experience
     --------------------------------------------------------------------- */
  function renderExperience() {
    var wrap = document.getElementById("timeline");
    wrap.innerHTML = "";
    (DATA.experience || []).forEach(function (job) {
      var item = el("div", { class: "timeline-item reveal" });
      var card = el("div", { class: "exp-card" });

      var head = el("div", { class: "exp-head" });
      var left = el("div");
      var roleLine = el("div");
      var role = el("span", { class: "exp-role", text: job.role || "" });
      roleLine.appendChild(role);
      if ((job.endDate || "").toLowerCase() === "present") {
        roleLine.appendChild(el("span", { class: "badge-current", text: "Current" }));
      }
      left.appendChild(roleLine);
      left.appendChild(el("div", { class: "exp-company", text: job.company || "" }));
      head.appendChild(left);

      var meta = el("div", { class: "exp-meta" });
      meta.appendChild(el("div", { class: "dates", text: [job.startDate, job.endDate].filter(Boolean).join(" – ") }));
      if (job.location) meta.appendChild(el("div", { text: job.location }));
      head.appendChild(meta);

      card.appendChild(head);

      if (job.highlights && job.highlights.length) {
        var list = el("ul", { class: "exp-list" });
        job.highlights.forEach(function (h) { list.appendChild(el("li", { text: h })); });
        card.appendChild(list);
      }

      item.appendChild(card);
      wrap.appendChild(item);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: projects
     --------------------------------------------------------------------- */
  function renderProjects() {
    var wrap = document.getElementById("projects-grid");
    wrap.innerHTML = "";
    (DATA.projects || []).forEach(function (proj) {
      var card = el("div", { class: "project-card reveal" });
      card.appendChild(el("h3", { text: proj.name || "" }));

      if (proj.tools && proj.tools.length) {
        var tools = el("div", { class: "project-tools" });
        proj.tools.forEach(function (t) { tools.appendChild(el("span", { class: "chip", text: t })); });
        card.appendChild(tools);
      }

      if (proj.description) card.appendChild(el("p", { class: "project-desc", text: proj.description }));

      if (proj.highlights && proj.highlights.length) {
        var list = el("ul", { class: "project-list" });
        proj.highlights.forEach(function (h) { list.appendChild(el("li", { text: h })); });
        card.appendChild(list);
      }

      if (proj.insight) card.appendChild(el("p", { class: "project-insight", text: proj.insight }));

      var links = el("div", { class: "project-links" });
      if (proj.projectUrl) {
        links.appendChild(el("a", { class: "btn btn-sm btn-ghost", text: "View Project", attrs: { href: proj.projectUrl, target: "_blank", rel: "noopener noreferrer" } }));
      }
      if (proj.githubUrl) {
        links.appendChild(el("a", { class: "btn btn-sm btn-ghost", text: "GitHub", attrs: { href: proj.githubUrl, target: "_blank", rel: "noopener noreferrer" } }));
      }
      if (links.childNodes.length) card.appendChild(links);

      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: certifications (+ view-only modal)
     --------------------------------------------------------------------- */
  function renderCertifications() {
    var wrap = document.getElementById("cert-grid");
    wrap.innerHTML = "";
    (DATA.certifications || []).forEach(function (cert) {
      var card = el("div", { class: "cert-card reveal" });

      var thumb = el("div", {
        class: "cert-thumb",
        attrs: { tabindex: "0", role: "button", "aria-label": "View " + (cert.name || "certificate") + " certificate" }
      });

      if (cert.image) {
        var img = el("img", { attrs: { src: cert.image, alt: (cert.name || "Certificate") + " certificate", loading: "lazy" } });
        img.addEventListener("error", function () {
          thumb.innerHTML = "";
          thumb.appendChild(el("div", { class: "placeholder", text: "Certificate image not added yet" }));
        });
        thumb.appendChild(img);
      } else {
        thumb.appendChild(el("div", { class: "placeholder", text: "Certificate image not added yet" }));
      }
      thumb.appendChild(el("div", { class: "view-overlay", text: "View certificate" }));

      function openModal() {
        if (!cert.image) return;
        openCertModal(cert);
      }
      thumb.addEventListener("click", openModal);
      thumb.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); }
      });

      card.appendChild(thumb);

      var body = el("div", { class: "cert-body" });
      body.appendChild(el("h3", { text: cert.name || "" }));
      if (cert.institute) body.appendChild(el("div", { class: "inst", text: cert.institute }));
      if (cert.date) body.appendChild(el("div", { class: "date", text: cert.date }));
      card.appendChild(body);

      wrap.appendChild(card);
    });
  }

  function openCertModal(cert) {
    var overlay = document.getElementById("cert-modal");
    var img = document.getElementById("cert-modal-img");
    var title = document.getElementById("cert-modal-title");
    var box = overlay.querySelector(".modal-box");

    img.style.display = "";
    var existingMsg = box.querySelector(".modal-missing");
    if (existingMsg) existingMsg.remove();

    img.onerror = function () {
      img.style.display = "none";
      var msg = el("p", { class: "modal-missing", text: "This certificate image hasn't been uploaded yet." });
      box.appendChild(msg);
    };
    img.src = cert.image;
    img.alt = (cert.name || "Certificate") + " certificate";
    title.textContent = [cert.name, cert.institute, cert.date].filter(Boolean).join(" · ");
    overlay.classList.add("open");
    document.getElementById("cert-modal-close").focus();
  }

  (function initModal() {
    var overlay = document.getElementById("cert-modal");
    var closeBtn = document.getElementById("cert-modal-close");
    function close() { overlay.classList.remove("open"); }
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  })();

  /* ---------------------------------------------------------------------
     RENDER: education
     --------------------------------------------------------------------- */
  function renderEducation() {
    var wrap = document.getElementById("edu-list");
    wrap.innerHTML = "";
    (DATA.education || []).forEach(function (ed) {
      var card = el("div", { class: "edu-card reveal" });
      var left = el("div");
      left.appendChild(el("div", { class: "edu-degree", text: ed.degree || "" }));
      left.appendChild(el("div", { class: "edu-inst", text: [ed.institute, ed.location].filter(Boolean).join(" — ") }));
      card.appendChild(left);
      card.appendChild(el("div", { class: "edu-years", text: [ed.startYear, ed.endYear].filter(Boolean).join(" – ") }));
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: contact
     --------------------------------------------------------------------- */
  function renderContact() {
    var p = DATA.profile || {};
    var wrap = document.getElementById("contact-grid");
    wrap.innerHTML = "";

    var items = [];
    if (p.email) items.push({ icon: "mail", label: "Email", value: p.email, href: "mailto:" + p.email });
    if (p.phone) items.push({ icon: "phone", label: "Phone", value: p.phone, href: "tel:" + p.phone.replace(/\s+/g, "") });
    if (p.linkedin) items.push({ icon: "linkedin", label: "LinkedIn", value: "Connect on LinkedIn", href: p.linkedin });
    if (p.github) items.push({ icon: "github", label: "GitHub", value: "View GitHub", href: p.github });

    items.forEach(function (it) {
      var card = el("a", { class: "contact-card reveal", attrs: { href: it.href, target: it.href.indexOf("http") === 0 ? "_blank" : "_self", rel: "noopener noreferrer" } });
      var icWrap = el("div", { class: "ic" });
      icWrap.innerHTML = icon(it.icon);
      card.appendChild(icWrap);
      card.appendChild(el("div", { class: "label", text: it.label }));
      card.appendChild(el("div", { class: "value", text: it.value }));
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------------
     Reveal-on-scroll
     --------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function init() {
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderCertifications();
    renderEducation();
    renderContact();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
