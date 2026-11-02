/* Kopi Pagi — interactions
   1. gallery: one frame, contents change (auto crossfade, tap to advance)
   2. recipe tabs: the live thing
   3. section entrances
   4. booking form -> mailto with the visitor's choices */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. gallery ---------- */

  var frame = document.getElementById("galleryFrame");
  var next = document.getElementById("galleryNext");
  var caption = document.getElementById("galleryCaption");

  if (frame) {
    var shots = Array.prototype.slice.call(frame.querySelectorAll(".frame-circle__img"));
    var captions = [
      "Pukul enam lewat sepuluh, meja panjang masih kosong.",
      "Susu dikukus dua puluh detik, tidak lebih.",
      "Drum berputar dua belas menit tiap batch.",
      "Dua tamu, dua seduhan manual, satu meja.",
      "Karung biji mentah menunggu jadwal sangrai berikutnya."
    ];
    var index = 0;
    var timer = null;

    function show(n) {
      index = (n + shots.length) % shots.length;
      shots.forEach(function (img, i) {
        img.classList.toggle("is-on", i === index);
      });
      if (caption) caption.textContent = captions[index] || "";
    }

    function play() {
      if (reduce || timer) return;
      timer = window.setInterval(function () { show(index + 1); }, 3400);
    }

    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    function advance() {
      stop();
      show(index + 1);
      play();
    }

    frame.addEventListener("click", advance);
    frame.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advance(); }
    });
    if (next) next.addEventListener("click", advance);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); } else { play(); }
    });

    play();
  }

  /* ---------- 2. recipe tabs (live thing) ---------- */

  var recipes = {
    v60: { bean: "15 g", water: "250 ml", temp: "92 °C", time: "2 menit 45 detik" },
    aeropress: { bean: "17 g", water: "220 ml", temp: "88 °C", time: "1 menit 30 detik" },
    tubruk: { bean: "12 g", water: "200 ml", temp: "96 °C", time: "4 menit" }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var out = {
    bean: document.getElementById("r-bean"),
    water: document.getElementById("r-water"),
    temp: document.getElementById("r-temp"),
    time: document.getElementById("r-time")
  };

  function applyRecipe(key) {
    var r = recipes[key];
    if (!r) return;
    Object.keys(out).forEach(function (k) {
      if (out[k]) out[k].textContent = r[k];
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      applyRecipe(tab.dataset.recipe);
    });
  });

  /* ---------- 3. entrances ---------- */

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var siblings = Array.prototype.slice.call(en.target.parentNode.children);
        var i = siblings.indexOf(en.target);
        en.target.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. booking ---------- */

  var form = document.getElementById("booking");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var body = [
        "Nama: " + (data.get("nama") || ""),
        "Jumlah orang: " + (data.get("orang") || ""),
        "Waktu: " + (data.get("waktu") || ""),
        "Catatan: " + (data.get("catatan") || "-")
      ].join("\n");
      var subject = "Pesan meja — " + (data.get("nama") || "tamu");
      window.location.href =
        "mailto:meja@kopipagi.id?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
