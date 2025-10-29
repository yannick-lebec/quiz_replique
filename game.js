// Dynamiser les questions
const commencer = document.querySelector("#btn-commencer");
const accueil = document.querySelector("#quiz_accueil");
const quiz = document.querySelector("#quiz-container");

let time = 15 //Pour le countdown

commencer.addEventListener("click", () => {
  // cacher l’écran d’accueil
  accueil.hidden = true;
  
  // afficher le quiz
  quiz.hidden = false;

  // On commence le timer
  setInterval (countdown, 1100)
});

function countdown (){
                                 // Si mon time est supérieur ou égal à 0
      const seconds = time < 10 ? '0' + time : time;         //et que  Si les secondes sont inférieures a 10, on rajoute 0 devant time
      countDownID.innerHTML = `00 : ${seconds}`                 // Ajoute 00 devant mes secondes 
       
      if(seconds > 0){
        time --
      } else if (seconds === 0){
        return false
      }                                       // on décrémente -1 a mon time 
    }

import { quiz_repliques } from "./questions.js"; // Import des questions


// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Sélection des éléments HTML
const question = document.getElementById("question-text");
const options = document.getElementById("options-container");
const boutonSuivant = document.getElementById('next-button');
const boutonRejouer = document.getElementById('replay-button');
const progressBar = document.getElementById("progressBar");
const countDownID = document.getElementById("countDown");


// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  // Vider le conteneur des options
  options.innerHTML = '';

  // Récupérer la question actuelle
  const currentQuestion = quiz_repliques.question[currentQuestionIndex];

  // Injecter la question dans le HTML
  question.innerText = currentQuestion.text;
  // Le bouton suivant est désactivé
  boutonSuivant.disabled = true;

  // Injecter les options dans le HTML 
  currentQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;

    option_btn.addEventListener("click", () => {
      checkAnswer(option_btn, option, currentQuestion.correct_answer);
    // Le bonton suivant est réactivé
    boutonSuivant.disabled = false;
    });
    options.appendChild(option_btn);
  });
}

let currentBar = progressBar.value;
let maxBar = progressBar.max;
const step = 25

// Ajouter un écouteur d'événements pour le bouton "Suivant"
boutonSuivant.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_repliques.question.length) {
    // Afficher la question suivante
    loadQuestion();
    time = 15
    countdown()
   } else {
    // Si plus de questions, indiquer la fin du quiz
    question.innerText = 'Le quiz est fini !';
    options.innerHTML = ''; // Effacer les options
    boutonSuivant.style.display = 'none'; // Cacher le bouton Suivant
    //progressBar.style.display = 'none'
    boutonRejouer.style.display = 'inline-block'
    time = 0
    countDownID.style.display = 'none'
  }

  if (currentBar < maxBar){                             // Si ma valeur de départ est inférieur à ma valeur maximum
      progressBar.value += step                                // alors augmente ma valeur de départ de 25
      if (currentBar > maxBar){
        currentBar = maxBar      //Si le nouvel ajout fait passer currentBar au-delà de maxBar, on la remet exactement à maxBar.
        }
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

  time = 15
  countdown()
  
  
  // TODO Cacher le bouton Rejouer et afficher le bouton Suivant
  boutonRejouer.style.display = 'none';
  boutonSuivant.style.display = 'inline-block';
  progressBar.style.display = 'inline-block';
  progressBar.value = 0
  countDownID.style.display = 'inline-block'
  
  // TODO Recharger la première question
  loadQuestion(currentQuestionIndex)

});

function checkAnswer(clickedButton, selectedOption, correctAnswer) {
  const allButtons = options.querySelectorAll("button");

  // Désactive tous les boutons après le clic
  allButtons.forEach((btn) => (btn.disabled = true));

  if (selectedOption === correctAnswer) {
    // Affiche la bonne réponse en vert
    clickedButton.style.backgroundColor = "green";
    clickedButton.style.color = "white";
  } else {
    // Affiche la mauvaise réponse en rouge
    clickedButton.style.backgroundColor = "red";
    clickedButton.style.color = "white";

    // Si la mauvaise réponse est cliquer affiche la bonne réponse
    allButtons.forEach((btn) => {
      if (btn.innerText === correctAnswer) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
    });
  }
}


  
