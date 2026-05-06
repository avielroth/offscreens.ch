const materialPriceInput = document.querySelector("#materialPrice");
const gramsInput = document.querySelector("#grams");
const hoursInput = document.querySelector("#hours");
const designInput = document.querySelector("#design");
const complexityInput = document.querySelector("#complexity");
const calculatorOutput = document.querySelector("#calculatorOutput");
const breakdownOutput = document.querySelector("#breakdownOutput");
const contactForm = document.querySelector("#contactForm");

const currency = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  maximumFractionDigits: 2
});

function getNumber(input, fallback = 0) {
  const value = Number.parseFloat(input?.value);
  return Number.isFinite(value) ? value : fallback;
}

function calculatePrice() {
  const materialPrice = getNumber(materialPriceInput, 25);
  const grams = getNumber(gramsInput, 35);
  const hours = getNumber(hoursInput, 3);
  const design = getNumber(designInput, 0);
  const complexity = getNumber(complexityInput, 1.25);

  const material = (grams / 1000) * materialPrice;
  const failedPrintBuffer = material * 0.18;
  const machine = hours * 0.65;
  const electricity = hours * 0.08;
  const businessReserve = Math.max(1.5, (material + machine + electricity) * 0.25);
  const amsFund = hours * 0.35;
  const personalProfit = Math.max(2, (material + machine + electricity + businessReserve) * 0.28);
  const subtotal = material + failedPrintBuffer + machine + electricity + businessReserve + amsFund + personalProfit + design;
  const total = Math.max(8, subtotal * complexity);

  calculatorOutput.textContent = currency.format(total);
  breakdownOutput.innerHTML = `
    <li><span>Material</span><strong>${currency.format(material)}</strong></li>
    <li><span>Fehldruck-Puffer</span><strong>${currency.format(failedPrintBuffer)}</strong></li>
    <li><span>Drucker-Amortisation</span><strong>${currency.format(machine)}</strong></li>
    <li><span>Strom</span><strong>${currency.format(electricity)}</strong></li>
    <li><span>Betrieb & AMS-Fonds</span><strong>${currency.format(businessReserve + amsFund)}</strong></li>
    <li><span>Für dich</span><strong>${currency.format(personalProfit)}</strong></li>
  `;
}

[materialPriceInput, gramsInput, hoursInput, designInput, complexityInput].forEach((input) => {
  input?.addEventListener("input", calculatePrice);
});

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

calculatePrice();
