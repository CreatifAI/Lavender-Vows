/* =========================================
   LAVENDER VOWS
   ========================================= */

/* COUNTDOWN */

const weddingDate = new Date("2027-10-18T16:00:00");

function updateCountdown() {
  const diff = Math.max(0, weddingDate - new Date());
  const mins = Math.floor(diff / 60000);

  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");

  if (daysEl) {
    daysEl.textContent =
      String(Math.floor(mins / 1440)).padStart(3, "0");
  }

  if (hoursEl) {
    hoursEl.textContent =
      String(Math.floor(mins / 60) % 24).padStart(2, "0");
  }

  if (minutesEl) {
    minutesEl.textContent =
      String(mins % 60).padStart(2, "0");
  }
}

updateCountdown();
setInterval(updateCountdown, 30000);


/* SCROLL REVEALS */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/*/* =========================================
   ENVELOPE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const sealTrigger =
    document.getElementById("seal-trigger");

  const envelopeStage =
    document.getElementById("envelope-stage");

  const invitationScroll =
    document.getElementById("invitation-scroll");

  const weddingAudio =
    document.getElementById("wedding-audio");


  if (!sealTrigger || !envelopeStage || !invitationScroll) {
    return;
  }


  sealTrigger.addEventListener("click", () => {

    /* Prevent repeated clicks */
    if (envelopeStage.classList.contains("opened")) {
      return;
    }


    /* Start music */
    if (weddingAudio) {
      weddingAudio.play().catch(() => {});
    }


    /* Start envelope opening */
    envelopeStage.classList.add("opening");


    /* Mark envelope fully open */
    setTimeout(() => {

      envelopeStage.classList.add("opened");

    }, 100);


    /* Reveal invitation */
    setTimeout(() => {

      invitationScroll.classList.add("open");

      invitationScroll.setAttribute(
        "aria-hidden",
        "false"
      );

    }, 500);


    /* Scroll naturally to invitation */
    setTimeout(() => {

      invitationScroll.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 900);

  });

});
/* =========================================
   RSVP
   ========================================= */

const rsvpForm =
  document.querySelector("#rsvp-form");

const formNote =
  document.querySelector("#form-note");


if (rsvpForm) {

  rsvpForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (formNote) {
      formNote.textContent =
        "Thank you — your RSVP has been noted with love.";
    }

    rsvpForm.reset();

  });

}