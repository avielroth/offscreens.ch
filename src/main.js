import "./styles.css";

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function setFormStatus(message, type = "info") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.dataset.type = type;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");

  setFormStatus("Wird gesendet ...");
  submitButton.disabled = true;

  fetch("/", {
    method: "POST",
    body: new URLSearchParams(data).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactForm.reset();
      setFormStatus("Danke! Deine Anfrage wurde gesendet.", "success");
    })
    .catch(() => {
      setFormStatus("Das Senden hat nicht geklappt. Bitte versuche es nochmal oder schreibe direkt per E-Mail.", "error");
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
