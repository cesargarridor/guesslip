// Muestra la página en el idioma del navegador o en el elegido en el selector.
// No guarda nada: el idioma va en la dirección (#de, #fr…) y los enlaces lo conservan.
(function () {
  var app = document.getElementById("app");
  var select = document.getElementById("idioma");
  var spanish = app.innerHTML;
  var templates = {};
  document.querySelectorAll("template[lang]").forEach(function (t) { templates[t.lang] = t; });
  var available = Object.keys(templates).concat("es");

  function fromBrowser() {
    var prefs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < prefs.length; i++) {
      var code = (prefs[i] || "").toLowerCase();
      if (code.indexOf("zh") === 0 && templates["zh-Hans"]) return "zh-Hans";
      var base = code.split("-")[0];
      if (available.indexOf(base) >= 0) return base;
    }
    return templates.en ? "en" : "es";
  }

  function current() {
    var hash = decodeURIComponent(location.hash.slice(1));
    return available.indexOf(hash) >= 0 ? hash : fromBrowser();
  }

  function show(lang) {
    app.innerHTML = lang === "es" ? spanish : templates[lang].innerHTML;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    select.value = lang;
    var h1 = app.querySelector("h1");
    if (h1) document.title = h1.textContent + " · Guesslip";
    app.querySelectorAll('a[href$=".html"]').forEach(function (a) {
      a.setAttribute("href", a.getAttribute("href").split("#")[0] + "#" + lang);
    });
  }

  select.addEventListener("change", function () { location.hash = select.value; });
  window.addEventListener("hashchange", function () { show(current()); });
  show(current());
})();
