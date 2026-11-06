(function () {
  var standalone = window.navigator.standalone;
  if (!standalone && window.matchMedia) {
    standalone = window.matchMedia("(display-mode: standalone)").matches;
  }
  if (!standalone) return;

  var navigating = false;

  function sameOriginUrl(event) {
    if (event.defaultPrevented) return null;
    if (typeof event.button === "number" && event.button !== 0) return null;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

    var link = event.target.closest("a");
    if (!link || link.hasAttribute("download")) return null;
    if (link.target && link.target !== "_self") return null;

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return null;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return null;
    }
    if (url.origin !== window.location.origin) return null;
    return url.href;
  }

  function stayInApp(event) {
    var href = sameOriginUrl(event);
    if (!href || navigating) return;
    event.preventDefault();
    navigating = true;
    window.location.assign(href);
  }

  document.addEventListener("click", stayInApp, true);
})();

(function () {
  var button = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!button || !nav) return;

  function setOpen(open) {
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.hidden = !open;
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    }
  }

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    setOpen(nav.hidden);
  });

  document.addEventListener("click", function (event) {
    if (nav.hidden) return;
    if (button.contains(event.target) || nav.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || nav.hidden) return;
    setOpen(false);
    button.focus();
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });
})();
