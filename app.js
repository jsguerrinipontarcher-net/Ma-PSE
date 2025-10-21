let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;

  installBtn.addEventListener("click", async () => {
    installBtn.hidden = true;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("L'installation a été acceptée");
    } else {
      console.log("L'installation a été refusée");
    }
    deferredPrompt = null;
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
// === Flashcards ===
const flashcards = [
  { question: "Qu’est-ce que la fréquence cardiaque normale au repos ?", answer: "Entre 60 et 100 battements par minute." },
  { question: "Quel est le rôle principal des globules rouges ?", answer: "Transporter l’oxygène dans le sang." },
  { question: "Quelle est la formule de l’IMC ?", answer: "IMC = Poids (kg) / (Taille en mètre)²" },
  { question: "Que signifie PSE ?", answer: "Prévention Santé Environnement." },
];

let currentIndex = 0;
let showingAnswer = false;

const card = document.getElementById("card");
const cardText = document.getElementById("cardText");
const nextBtn = document.getElementById("nextCard");
const prevBtn = document.getElementById("prevCard");

function updateCard() {
  const current = flashcards[currentIndex];
  cardText.textContent = showingAnswer ? current.answer : current.question;
}

card.addEventListener("click", () => {
  showingAnswer = !showingAnswer;
  card.style.transform = "rotateY(180deg)";
  setTimeout(() => {
    updateCard();
    card.style.transform = "rotateY(0deg)";
  }, 250);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  showingAnswer = false;
  updateCard();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  showingAnswer = false;
  updateCard();
});

// Afficher la première carte
updateCard();
