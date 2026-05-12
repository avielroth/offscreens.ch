if (import.meta.env?.DEV) {
  await import("./styles.css");
}

const contactForm = document.querySelector("#contactForm");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`3D-Druck Anfrage: ${data.get("project") || "Custom Print"}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.get("name") || ""}`,
      `E-Mail: ${data.get("email") || ""}`,
      `Projekt: ${data.get("project") || ""}`,
      `Details: ${data.get("message") || ""}`
    ].join("\n")
  );

  window.location.href = `mailto:aviel@yolu.ch?subject=${subject}&body=${body}`;
});
