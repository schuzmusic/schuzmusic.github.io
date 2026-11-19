document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // Click-to-play YouTube cards (fast page load: thumbnails until clicked)
  document.querySelectorAll(".yt[data-id]").forEach(function (el) {
    var id = el.getAttribute("data-id");
    el.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    function play() {
      if (el.querySelector("iframe")) return;
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.title = el.getAttribute("aria-label") || "Schuz video";
      el.innerHTML = "";
      el.appendChild(f);
    }
    el.addEventListener("click", play);
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
