
let button = document.getElementById("boutonSuivant")



let currentBar = 0;
let maxBar = 100;
const step = 25

  const progressBar = document.getElementById("progressBar");
  const boutonSuivant = document.getElementById("boutonSuivant")
    // progressBar.value = currentBar;
    // progressBar.max = maxBar;

    boutonSuivant.addEventListener("click", function() { 
        if ( currentBar < maxBar){                             // Si ma valeur de départ est inférieur à ma valeur maximum
            currentBar += step                                // alors augmente ma valeur de départ de 25
            if (currentBar> maxBar) currentBar = maxBar      //Si le nouvel ajout fait passer currentBar au-delà de maxBar, on la remet exactement à maxBar.
            progressBar.value = currentBar
        }
         if (currentBar >= maxBar) {                        // Si ma valeur est supérieure ou égale a ma valeur max (quizz fini)
                                                          
          boutonSuivant.disabled = true;                  // Alors, désactive le bouton suivant
         
         
         setTimeout(() => {                               //// Laisse le navigateur mettre à jour la barre avant l'alerte

         
       alert("Bravo le Quiz est fini !");      
      }, 200);                                            // J'ai mis 200 ms car ca mes emblait bien mais on peut changer. C'est le temps de rechargement de la. barre de progression avant le lancement de l'alerte. 
    }
  });
    

  