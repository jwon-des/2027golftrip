(function () {
  var root = document.querySelector(".countdown");
  if (!root) return;

  var target = Date.parse("2027-06-25T16:00:00-07:00");
  var kicker = root.querySelector(".countdown-kicker");
  var units = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]')
  };

  function pad(n) {
    var text = String(n);
    return text.length < 2 ? "0" + text : text;
  }

  function render(days, hours, minutes, seconds) {
    units.days.textContent = pad(days);
    units.hours.textContent = pad(hours);
    units.minutes.textContent = pad(minutes);
    units.seconds.textContent = pad(seconds);
  }

  var timer;

  function tick() {
    var remaining = target - Date.now();
    if (remaining <= 0) {
      render(0, 0, 0, 0);
      if (kicker) kicker.textContent = "See you in Bend";
      clearInterval(timer);
      return;
    }
    var totalSeconds = Math.floor(remaining / 1000);
    render(
      Math.floor(totalSeconds / 86400),
      Math.floor((totalSeconds % 86400) / 3600),
      Math.floor((totalSeconds % 3600) / 60),
      totalSeconds % 60
    );
  }

  timer = setInterval(tick, 1000);
  tick();
})();
