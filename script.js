
// quand on clique sur commencer la page d'accueil disparait et la page quiz est visible.

const commencer = document.querySelector("#btn-commencer");
const accueil = document.querySelector("#quiz_accueil");
const quiz = document.querySelector("#quiz-container");

commencer.addEventListener("click", () => {
  // cacher l’écran d’accueil
  accueil.hidden = true;
  
  // afficher le quiz
  quiz.hidden = false;
});

