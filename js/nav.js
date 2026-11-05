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
