# quiz_replique

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quiz Game</title>
<link rel="stylesheet" href="style.css">
<script defer src="./questions.js"></script>
<script defer src="./game.js"></script>
</head>
<body>
	<div id="quiz-container">
	<!-- Section pour la question -->
		<div class="question">
		Fatoumata Kébé est reconnue pour ses recherches dans quel domaine scientifique ?
		</div>
		<!-- Section pour les options -->
		<div class="options">
		  <button>L'astronomie, spécialisée dans les débris spatiaux.</button>
		  <button>La création de lunettes de réalité augmentée pour observer les étoiles.</button>
		  <button>L'étude de la météo sur Mars et ses implications pour l'agriculture spatiale.</button>
		  <button>La cartographie des astéroïdes qui pourraient potentiellement entrer en collision avec la Terre.</button>
		</div>
		
		<!-- Prévois déjà le design du bouton "suivant" pour passer à la prochaine question -->
		 <div class="button-container">
		  <button id="next-button">Suivant</button>
		</div>
	</div>
</body>
</html>