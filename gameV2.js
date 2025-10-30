// Lien avec un autre JS
import { quiz_repliques } from "./questions.js"; // Import des questions

// Pour Page d'Accueil
const commencer = document.querySelector("#btn-commencer");
const accueil = document.querySelector("#quiz_accueil");
const quiz = document.querySelector("#quiz-container");

// Pour les Questions
const questionImage = document.getElementById("question-image");
const imageContainer = document.getElementById("image-container")
const question = document.getElementById("question-text");
const options = document.getElementById("options-container");
const boutonSuivant = document.getElementById("next-button");
const boutonRejouer = document.getElementById("replay-button");
const boutonAutreQuiz = document.getElementById("otherQuiz-button");

let currentQuestionIndex = 0; // Variables pour suivre l'état du quiz // Commence à la première question

// Pour la barre de progression
const progressBar = document.getElementById("progressBar");

let currentBar = progressBar.value;
let maxBar = progressBar.max;
const step = maxBar / quiz_repliques.question.length

// Pour le timer
const dialog = document.getElementById("timeUpDialog");
const closeButton = document.getElementById("closeButton");
const countDownID = document.getElementById("countDown");

let time = 15;
let timerInterval;

// Pour le score
const name = document.getElementById("name-container");
const nameButton = document.getElementById("nameButton");
const inputID = document.getElementById("inputID");
const scoreFinal = document.getElementById("scoreFinal");

let maxScore = quiz_repliques.question.length

let score = 0;

// Pour le Classement
const classementDialog = document.getElementById("classementDialog");
const classementList = document.getElementById("classementList");
const boutonClassement = document.getElementById("boutonClassement");

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []; // Récupère l'ancien classement depuis localStorage



// Code Page d'Accueil

commencer.addEventListener("click", () => {
  // cacher l’écran d’accueil
  accueil.hidden = true;

  // afficher le quiz
  quiz.hidden = false;
  // cache le bouton autre quiz
  boutonAutreQuiz.style.display = "none";

  // On commence le timer
  clearInterval(timerInterval);
  timerInterval = setInterval(countdown, 1100);

  // Pour cacher le name
  name.hidden = true;
});

// Fonction pour afficher une question basée sur l'index actuel

function loadQuestion() {
  // Vider le conteneur des options
  options.innerHTML = "";

  // Récupérer la question actuelle
  const currentQuestion = quiz_repliques.question[currentQuestionIndex];

  // Injecter la question dans le HTML
  question.innerText = currentQuestion.text;

  // Injecte l'image si la question est chargé
    questionImage.src = currentQuestion.images;
    questionImage.alt = `Illustration – ${currentQuestion.text}`;
    imageContainer.hidden = false;
  

  // Le bouton suivant est désactivé
  boutonSuivant.disabled = true;

  // Injecter les options dans le HTML
  currentQuestion.options.forEach((option) => {
    const option_btn = document.createElement("button");
    option_btn.innerText = option;
    option_btn.addEventListener("click", () => {
      clearInterval(timerInterval);
      checkAnswer(option_btn, option, currentQuestion.correct_answer);
      // Le bonton suivant est réactivé
      boutonSuivant.disabled = false;
    });
    options.appendChild(option_btn);
  });
  if (currentQuestionIndex > 0) {
    time = 15;
    clearInterval(timerInterval); // on s’assure d’arrêter l’ancien timer
    timerInterval = setInterval(countdown, 1000);
  } else if (currentQuestion === 0) {
    time = 15;
  }

  name.hidden = true;
}

// Fonction pour le Timer

function countdown() {
  // Si mon time est supérieur ou égal à 0
  const seconds = time < 10 ? "0" + time : time; //et que  Si les secondes sont inférieures a 10, on rajoute 0 devant time
  countDownID.innerHTML = `00 : ${seconds}`; // Ajoute 00 devant mes secondes

  if (seconds > 0) {
    time--;
  } else {
    clearInterval(timerInterval); // on décrémente -1 a mon time
    dialog.showModal();
  }
}

// Fonction pour le bouton Suivant
 


boutonSuivant.addEventListener("click", () => {
  if (score === maxScore){
    confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 }
})};
  // Incrémenter l'index de la question

  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_repliques.question.length) {
    // Afficher la question suivante
    loadQuestion();
    time = 15;
    countdown();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    question.innerText = "Le quiz est fini !";
    options.innerHTML = ""; // Effacer les options
    boutonSuivant.style.display = "none"; // Cacher le bouton Suivant
    //progressBar.style.display = 'none'
    boutonRejouer.style.display = 'inline-block';
    boutonAutreQuiz.style.display = "inline-block";
    countDownID.style.display = 'none';
    clearInterval(timerInterval)
    time = 15
    name.hidden = false
    imageContainer.hidden = true
  }

  if (currentBar < maxBar) {
    // Si ma valeur de départ est inférieur à ma valeur maximum
    progressBar.value += step; // alors augmente ma valeur de départ de 25
    if (currentBar > maxBar) {
      currentBar = maxBar; //Si le nouvel ajout fait passer currentBar au-delà de maxBar, on la remet exactement à maxBar.
    }
  }
});

loadQuestion(currentQuestionIndex); // Charger la première question au chargement de la page

// Fonction pour fermer le message du Timer

closeButton.addEventListener("click", () => {
  dialog.close();
  // Incrémenter l'index de la question

  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_repliques.question.length) {
    // Afficher la question suivante
    loadQuestion();
    time = 15;
    countdown();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    question.innerText = "Le quiz est fini !";
    options.innerHTML = ""; // Effacer les options
    boutonSuivant.style.display = "none"; // Cacher le bouton Suivant
    //progressBar.style.display = 'none'
    boutonRejouer.style.display = "inline-block";
    boutonAutreQuiz.style.display = "inline-block";
    dialog.style.display = "none";
    countDownID.style.display = "none";
  }

  if (currentBar < maxBar) {
    // Si ma valeur de départ est inférieur à ma valeur maximum
    progressBar.value += step; // alors augmente ma valeur de départ de 25
    if (currentBar > maxBar) {
      currentBar = maxBar; //Si le nouvel ajout fait passer currentBar au-delà de maxBar, on la remet exactement à maxBar.
    }
  }
});

// Fonction pour réinitialiser le quiz

boutonRejouer.addEventListener("click", () => {
  // TODO Réinitialiser l'index
  currentQuestionIndex = 0;
  //console.log(currentQuestionIndex)

  time = 15;
  clearInterval(timerInterval); // on s’assure d’arrêter l’ancien timer
  timerInterval = setInterval(countdown, 1000);

  // TODO Cacher le bouton Rejouer et afficher le bouton Suivant
  boutonAutreQuiz.style.display = "none";
  boutonRejouer.style.display = "none";
  boutonSuivant.style.display = "inline-block";
  progressBar.style.display = "inline-block";
  progressBar.value = 0;
  countDownID.style.display = "inline-block";

  // TODO Recharger la première question
  loadQuestion(currentQuestionIndex);

  //Réinisialisation du score à zéro
  score = 0;
  scoreFinal.innerHTML = `Score : ${score}`;
});

// Fonction pour verifier les réponses

function checkAnswer(clickedButton, selectedOption, correctAnswer) {
  const allButtons = options.querySelectorAll("button");

  // Désactive tous les boutons après le clic
  allButtons.forEach((btn) => (btn.disabled = true));

  if (selectedOption === correctAnswer) {
    // Affiche la bonne réponse en vert
    clickedButton.style.backgroundColor = "green";
    clickedButton.style.color = "white";
    score++;
    scoreFinal.innerHTML = `Score : ${score}`;
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


// Fonction pour le bouton Prénom

nameButton.addEventListener ("click", () =>{
    showLeaderboard(leaderboard);
    classementDialog.showModal();
    inputID.value = '';
    
});


// Fonction pour le classement
function showLeaderboard(leaderboard){
    leaderboard.push({name : inputID.value, points: score});             // Ajoute le nouveau joueur
    leaderboard.sort((a, b) => b.points - a.points);                    // Trie le classement (de plus grand au plus petit)
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))   // Sauvegarde le classement mis à jour

    classementList.innerHTML='';

    //Crée le classement
    leaderboard.forEach((entry, index) =>{
        const item = document.createElement('p');
        item.textContent = `${index + 1}.${entry.name} - ${entry.points} pts`;
        classementList.appendChild(item);
    });
    //classementDialog.showModal()
}

// Pour le bouton du Classement

boutonClassement.addEventListener ("click", () => {
    classementDialog.close()
})

boutonAutreQuiz.addEventListener("click", () => {
  window.location.href = "https://www.quizz.biz"
});
