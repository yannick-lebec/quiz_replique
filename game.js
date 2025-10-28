// Dynamiser les questions

import { quiz_repliques } from "./questions.js"; // Import des questions

//Récupérer les emplacements pour injecter la question et les options
const question = document.getElementById("question-text")
//console.log(question)
const options = document.getElementById("options-container")


//Récuperer la première question
const firstQuestion = quiz_repliques.question[0];

// Injecter le texte de la question dans l'emplacement dédié
question.innerText = firstQuestion.text;

// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    options.classList.add('options')
    options.appendChild(option_btn)
}
) ;