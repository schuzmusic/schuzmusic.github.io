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

  // Background videos (hero + A/V set). Hidden until actually playing,
  // so visitors never see YouTube's spinner or play button.
  var bgs = document.querySelectorAll(".bg-video[data-id]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (bgs.length && !reduce) {
    window.onYouTubeIframeAPIReady = function () {
      bgs.forEach(function (box) {
        var id = box.getAttribute("data-id");
        var holder = document.createElement("div");
        box.appendChild(holder);
        var player = new YT.Player(holder, {
          videoId: id,
          host: "https://www.youtube-nocookie.com",
          playerVars: { autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: id, playsinline: 1,
                        modestbranding: 1, rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0 },
          events: {
            onReady: function (e) { e.target.mute(); e.target.playVideo(); },
            onStateChange: function (e) {
              if (e.data === 1) {                                              // playing: show after YouTube's start-up buttons fade
                clearTimeout(box._t);
                box._t = setTimeout(function () {
                  if (e.target.getPlayerState && e.target.getPlayerState() === 1) box.classList.add("on");
                }, 3500);
              }
              if (e.data === 2 || e.data === -1 || e.data === 3) {             // paused/unstarted/buffering: hide
                clearTimeout(box._t); box.classList.remove("on");
              }
              if (e.data === 0) e.target.playVideo();                          // ended: loop
            }
          }
        });
        players.push(player);
      });
    };
    var players = [];
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        players.forEach(function (pl) { if (pl.playVideo) { pl.mute(); pl.playVideo(); } });
      }
    });
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  // Respect "reduce motion": keep the hero on its still frame
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".hero-video").forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
