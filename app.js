// === Gestion de l'installation PWA ===
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Résultat de l'installation : ${outcome}`);
    deferredPrompt = null;
    installBtn.hidden = true;
  }
});

// === Service Worker ===
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker enregistré'))
    .catch(err => console.error('Erreur SW :', err));
}

// === Flashcards avec effet 3D ===
const flashcards = [
  { question: "Qu’est-ce que la fréquence cardiaque normale au repos ?", answer: "Entre 60 et 100 battements par minute." },
  { question: "Quel est le rôle principal des globules rouges ?", answer: "Transporter l’oxygène dans le sang." },
  { question: "Quelle est la formule de l’IMC ?", answer: "IMC = Poids (kg) / (Taille en mètre)²" },
  { question: "Que signifie PSE ?", answer: "Prévention Santé Environnement." }
];

let currentIndex = 0;

// Sélection des éléments HTML
const card = document.getElementById("flashCard");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const nextBtn = document.getElementById("nextCard");
const prevBtn = document.getElementById("prevCard");

// Sécurité : vérifier que les éléments existent
if (card && questionEl && answerEl) {

  function showCard(index) {
    const data = flashcards[index];
    questionEl.textContent = data.question;
    answerEl.textContent = data.answer;
    card.classList.remove("is-flipped");
  }

  // Gestion du clic sur la carte (rotation)
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });

  // Boutons navigation
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % flashcards.length;
      showCard(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
      showCard(currentIndex);
    });
  }

  // Affiche la première carte
  showCard(currentIndex);

} else {
  console.error("❌ Les éléments HTML nécessaires aux flashcards n'ont pas été trouvés.");
}
