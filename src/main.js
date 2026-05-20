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
  const endpoint = contactForm.action;

  if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
    setFormStatus("Bitte zuerst den Formspree-Endpunkt in index.html eintragen.", "error");
    return;
  }

  const data = new FormData(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");

  setFormStatus("Wird gesendet ...");
  submitButton.disabled = true;

  fetch(endpoint, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
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
