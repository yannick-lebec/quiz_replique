// Dynamiser les questions

import { quiz_repliques } from "./questions.js"; // Import des questions

// //Récupérer les emplacements pour injecter la question et les options
// const question = document.getElementById("question-text")
// //console.log(question)
// const options = document.getElementById("options-container")


// //Récuperer la première question
// const firstQuestion = quiz_repliques.question[0];

// // Injecter le texte de la question dans l'emplacement dédié
// question.innerText = firstQuestion.text;

// // Pour chaque option, créer un bouton et l'ajouter au conteneur
// firstQuestion.options.forEach(option => {
//     const option_btn = document.createElement('button');
//     option_btn.innerText = option;
//     options.classList.add('options')
//     options.appendChild(option_btn)
// }
// ) ;

//ETAPE 5

// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Sélection des éléments HTML
const question = document.getElementById("question-text");
const options = document.getElementById("options-container");
const boutonSuivant = document.getElementById('next-button');
const boutonRejouer = document.getElementById('replay-button');

// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  // Vider le conteneur des options
  options.innerHTML = '';

  // Récupérer la question actuelle
  const currentQuestion = quiz_repliques.question[currentQuestionIndex];

  // Injecter la question dans le HTML
  question.innerText = currentQuestion.text;

  // Injecter les options dans le HTML 
  currentQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    options.classList.add('options');
    options.appendChild(option_btn);
  });
}

// Ajouter un écouteur d'événements pour le bouton "Suivant"
boutonSuivant.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_repliques.question.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    question.innerText = 'Le quiz est fini !';
    options.innerHTML = ''; // Effacer les options
    boutonSuivant.style.display = 'none'; // Cacher le bouton Suivant
    boutonRejouer.style.display = 'inline-block'
  }
});

// Charger la première question au chargement de la page
loadQuestion(currentQuestionIndex);

// ETAPE 6 :

// Fonction pour réinitialiser le quiz
boutonRejouer.addEventListener('click', () => {
  // TODO Réinitialiser l'index 
  currentQuestionIndex = 0 ;
  //console.log(currentQuestionIndex)
  
  
  // TODO Cacher le bouton Rejouer et afficher le bouton Suivant
  boutonRejouer.style.display = 'none';
  boutonSuivant.style.display = 'inline-block';
  
  // TODO Recharger la première question
  loadQuestion(currentQuestionIndex)

});