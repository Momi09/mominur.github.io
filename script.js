// Research Portfolio interactions
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const themeToggle = document.getElementById("themeToggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

primaryNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Theme preference is stored locally in the visitor's browser.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("portfolio-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("portfolio-theme", "dark");
  }
});

// Project category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

// Accessible project details dialog
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTools = document.getElementById("modalTools");
const modalLink = document.getElementById("modalLink");
let lastFocusedElement = null;

document.querySelectorAll(".details-button").forEach(button => {
  button.addEventListener("click", () => {
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = button.dataset.title || "Project details";
    modalDescription.textContent = button.dataset.description || "";
    modalTools.textContent = button.dataset.tools || "";
    const link = button.dataset.link || "#";
    modalLink.href = link;
    modalLink.hidden = link === "#";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalClose.focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  lastFocusedElement?.focus();
}
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Publication data: add verified entries to this array.
// Example:
// { type: "journal", year: "2026", title: "Article title", authors: "A. Author, Your Name",
//   venue: "Journal Name, volume(issue), pages", doi: "https://doi.org/..." }
const publications = [];

const publicationList = document.getElementById("publicationList");
const publicationSearch = document.getElementById("publicationSearch");
const publicationType = document.getElementById("publicationType");

function renderPublications() {
  const query = (publicationSearch?.value || "").trim().toLowerCase();
  const type = publicationType?.value || "all";
  const filtered = publications.filter(pub => {
    const text = [pub.title, pub.authors, pub.venue, pub.year, pub.type].join(" ").toLowerCase();
    return text.includes(query) && (type === "all" || pub.type === type);
  });

  if (!filtered.length) {
    publicationList.innerHTML = `<div class="empty-publications"><span>＋</span><strong>${publications.length ? "No matching publications." : "Your publications will appear here."}</strong><p>${publications.length ? "Try a different search term or publication type." : "Add verified bibliographic records to the publications array in script.js."}</p></div>`;
    return;
  }

  publicationList.innerHTML = filtered.map(pub => `
    <article class="publication-entry">
      <div class="pub-type">${escapeHTML(pub.type || "publication")} · ${escapeHTML(pub.year || "")}</div>
      <div>
        <h3>${escapeHTML(pub.title || "Untitled publication")}</h3>
        <p>${escapeHTML(pub.authors || "")}</p>
        <p>${escapeHTML(pub.venue || "")}</p>
        ${pub.doi ? `<a href="${safeURL(pub.doi)}" target="_blank" rel="noopener">DOI / View publication ↗</a>` : ""}
      </div>
    </article>`).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
function safeURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch { return "#"; }
}
publicationSearch?.addEventListener("input", renderPublications);
publicationType?.addEventListener("change", renderPublications);
renderPublications();

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
