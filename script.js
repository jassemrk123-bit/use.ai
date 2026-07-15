/* ============ SHARED NAV + FOOTER (edit once, applies everywhere) ============ */
const NAV_LINKS = [
  ["index.html", "Home"], ["catalogues.html", "Catalogues"],
  ["graphics.html", "Graphics"], ["video.html", "Video"],
  ["process.html", "Process"], ["tools.html", "Tools"],
  ["services.html", "Services"], ["testimonials.html", "Clients"],
  ["lab.html", "Lab"], ["about.html", "About"], ["contact.html", "Contact"],
];

const here = location.pathname.split("/").pop() || "index.html";

document.getElementById("nav").outerHTML = `
<header>
  <div class="nav-inner">
    <a class="logo" href="index.html">YOUR<span>NAME</span>.studio</a>
    <button id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    <nav id="menu"><ul>
      ${NAV_LINKS.map(([href, label], i) =>
        `<li style="--i:${i}"><a href="${href}" class="${href === here ? "active" : ""}">${label}</a></li>`
      ).join("")}
    </ul></nav>
  </div>
</header>`;

document.getElementById("footer").outerHTML = `
<footer>
  <div class="big flicker">Let's make something loud.</div>
  <a class="btn" href="contact.html">Start a project</a>
  <p style="margin:2rem auto 0;max-width:none">© ${new Date().getFullYear()} YOURNAME — designed & coded by me</p>
</footer>`;

/* burger */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  menu.classList.toggle("open");
});

/* ============ CUSTOM CURSOR ============ */
const cur = document.getElementById("cursor");
const dot = document.getElementById("cursor-dot");
let mx = 0, my = 0, cx = 0, cy = 0;

window.addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
(function follow() {
  cx += (mx - cx) * 0.16;
  cy += (my - cy) * 0.16;
  cur.style.left = cx + "px";
  cur.style.top = cy + "px";
  requestAnimationFrame(follow);
})();
document.addEventListener("mouseover", e => {
  cur.classList.toggle("hovering", !!e.target.closest("a, button, .card"));
});

/* ============ SCROLL REVEALS + SKILL BARS ============ */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal-l, .reveal-r, .reveal-u, .skill").forEach(el => io.observe(el));

/* ============ ACCORDIONS ============ */
document.querySelectorAll(".acc-head").forEach(head => {
  head.addEventListener("click", () => {
    const acc = head.parentElement;
    const body = acc.querySelector(".acc-body");
    const open = acc.classList.toggle("open");
    body.style.maxHeight = open ? body.scrollHeight + "px" : 0;
  });
});

/* ============ DRAG CAROUSELS (mouse + touch swipe) ============ */
document.querySelectorAll(".carousel").forEach(track => {
  let down = false, startX = 0, startScroll = 0;
  track.addEventListener("pointerdown", e => {
    down = true; startX = e.clientX; startScroll = track.scrollLeft;
    track.classList.add("grabbing");
  });
  window.addEventListener("pointerup", () => { down = false; track.classList.remove("grabbing"); });
  track.addEventListener("pointermove", e => {
    if (!down) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });
});

/* ============ 3D TILT CARDS (desktop) ============ */
if (matchMedia("(hover:hover)").matches) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

/* ============ EASTER EGG: type "neon" to swap the accent color ============ */
let buf = "";
window.addEventListener("keydown", e => {
  buf = (buf + e.key).slice(-4);
  if (buf === "neon") {
    const c = ["#c8ff00", "#00f0ff", "#ff3dcf", "#ffb800"][Math.floor(Math.random() * 4)];
    document.documentElement.style.setProperty("--neon", c);
  }
});
