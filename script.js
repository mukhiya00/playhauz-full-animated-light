// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn?.addEventListener("click", () => menu.classList.toggle("show"));

// Fake live counter
const liveText = document.getElementById("liveText");
function rand(min, max){ return Math.floor(Math.random() * (max-min+1)) + min; }
setInterval(() => {
  if (!liveText) return;
  liveText.textContent = `${rand(80, 220)} People searching right now!`;
}, 2500);

// Animated images in cards
function setupAnimatedCardImages() {
  document.querySelectorAll(".p-media").forEach((el) => {
    const list = (el.dataset.images || "").split(",").map(s => s.trim()).filter(Boolean);
    if (!list.length) return;

    let i = 0;
    el.style.backgroundImage = `url("${list[i]}")`;

    setInterval(() => {
      i = (i + 1) % list.length;
      el.style.opacity = "0.75";
      setTimeout(() => {
        el.style.backgroundImage = `url("${list[i]}")`;
        el.style.opacity = "1";
      }, 200);
    }, 2600);
  });
}
setupAnimatedCardImages();

// Booking modal + WhatsApp
const modal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const bmTitle = document.getElementById("bmTitle");
const bmPrice = document.getElementById("bmPrice");

let selectedCategory = "";
let selectedPrice = "";

// Open modal from cards
document.querySelectorAll(".open-booking").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".p-card");
    selectedCategory = card?.dataset.category || "Booking";
    selectedPrice = card?.dataset.price || "0";
    bmTitle.textContent = selectedCategory;
    bmPrice.textContent = `₹${selectedPrice}`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Open modal from top Book Now button (uses selected fields)
document.getElementById("bookNowTop")?.addEventListener("click", () => {
  selectedCategory = "General Booking";
  selectedPrice = "1949";
  bmTitle.textContent = selectedCategory;
  bmPrice.textContent = `₹${selectedPrice}`;

  // Prefill from top form
  const topLoc = document.getElementById("location")?.value || "";
  const topDate = document.getElementById("date")?.value || "";
  if (topLoc) document.getElementById("bmLocation").value = topLoc;
  if (topDate) document.getElementById("bmDate").value = topDate;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

closeModal?.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
});

document.getElementById("bmConfirm")?.addEventListener("click", () => {
  const city = document.getElementById("bmCity").value;
  const loc = document.getElementById("bmLocation").value;
  const date = document.getElementById("bmDate").value;
  const slot = document.getElementById("bmSlot").value;
  const name = document.getElementById("bmName").value.trim();
  const phone = document.getElementById("bmPhone").value.trim();

  if (!loc || !date || !slot || !name || phone.length < 10) {
    alert("Please fill Location, Date, Slot, Name, Phone.");
    return;
  }

  // ✅ Change these two later
  const WHATSAPP_NUMBER = "910000000000"; // <- apna number daal dena
  const CALL_NUMBER = "+910000000000";    // <- apna number daal dena
  document.querySelector(".fab.call")?.setAttribute("href", `tel:${CALL_NUMBER}`);
  document.querySelector(".fab.wa")?.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);

  const msg =
`Hi Playhauz! I want to book:
Category: ${selectedCategory}
Price: ₹${selectedPrice}
City: ${city}
Location: ${loc}
Date: ${date}
Slot: ${slot}
Name: ${name}
Phone: ${phone}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});
