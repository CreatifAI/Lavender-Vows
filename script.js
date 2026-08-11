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


/* =========================================
   ENVELOPE
   ========================================= */

const sealTrigger =
  document.querySelector("#seal-trigger");

const envelopeStage =
  document.querySelector("#envelope-stage");

const invitationScroll =
  document.querySelector("#invitation-scroll");

const weddingAudio =
  document.querySelector("#wedding-audio");


if (
  sealTrigger &&
  envelopeStage &&
  invitationScroll
) {

  sealTrigger.addEventListener("click", function () {

    console.log("Wax seal clicked");

    /* Start music from the user's click */

    if (weddingAudio) {
      weddingAudio.play().catch((error) => {
        console.log("Audio playback blocked:", error);
      });
    }


    /* Prevent double clicks */

    if (
      envelopeStage.classList.contains("opening") ||
      envelopeStage.classList.contains("opened")
    ) {
      return;
    }


    /* Begin opening */

    envelopeStage.classList.add("opening");


    /* Envelope moves away */

    setTimeout(() => {

      envelopeStage.classList.add("opened");

    }, 100);


    /* Invitation rises */

    setTimeout(() => {

      invitationScroll.classList.add("open");

      invitationScroll.setAttribute(
        "aria-hidden",
        "false"
      );

    }, 500);


    /* Move naturally toward invitation */

    setTimeout(() => {

      invitationScroll.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 900);

  });

}


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