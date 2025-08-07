# Framework Fullstack

## Description

Ce projet est une application web simple permettant de consulter des produits, passer des commandes, gérer un compte fidélité, et afficher un historique des commandes.  
Le backend est réalisé avec Symfony et stocke l’historique des commandes en session (sans base de données).  
Le frontend utilise Vue.js avec Axios pour communiquer avec l’API.

---

## Fonctionnalités

- Affichage des produits disponibles.
- Passer une commande en sélectionnant un produit, une quantité, et en saisissant des informations de paiement.
- Création et consultation d’un compte fidélité (nom, prénom, email).
- Consultation de l’historique des commandes passées pendant la session.

---

## Installation

### Prérequis

- PHP 8+ avec Symfony
- Node.js
- Composer

### Backend

1. Cloner le projet
2. Installer les dépendances Symfony :
    composer install
3. Lancer le serveur Symfony :
    symfony server:start
4. Le backend est accessible par défaut sur http://localhost:8000

### Frontend

1. Installer les dépendances :
    npm install
2. Lancer le serveur de développement ou compiler le bundle
3. Ouvrir la page index.html contenant le script Vue.js

### Structure du projet

### Backend

- src/Controller/Api/CommandeController.php : gestion des commandes, stockage historique en session.
- src/Controller/Api/FideliteController.php (non détaillé ici) : gestion des comptes fidélité.

### Frontend

- app.js : Vue.js application utilisant Axios pour appeler l’API.
- styles/app.css : styles basiques.

### Routes API principales

- /api/produits=> GET=> Retourne la liste des produits
- /api/commandes=> POST=> Crée une commande, ajoute à l'historique en session
- /api/commandes/historique=> GET=> Retourne l'historique des commandes en session
- /api/fidelite/creer=> POST=> Crée un compte fidélité
- /api/fidelite/consulter=> GET=> Recherche un compte fidélité par email

### Exemple d’utilisation

1. Charger la page, la liste des produits apparaît.
2. Passer une commande en sélectionnant produit, quantité, numéro de carte, date d’expiration.
3. Consulter ou créer un compte fidélité.
4. Voir l’historique des commandes passées dans la session.

### Limitations

- Pas de base de données, tout est stocké en session PHP.
- L’historique est perdu si la session expire ou si le serveur redémarre.
- Validation basique des données côté serveur.

### Sources 

- Chaîne YouTube : Tech Wall https://www.youtube.com/@TechWall
- Playlist : VueJs avec Symfony https://www.youtube.com/playlist?list=PLl3CtU4THqPZ1ARMWsmhCYzlCEMZgTBes
- Doc Symfony : https://symfony.com/doc/current/setup.html https://symfony.com/doc/current/page_creation.html
- Video Loom : https://www.loom.com/share/19724c9437a94281b4330a93906fc7fb?sid=7e2bd054-22c9-490b-97aa-beb50de4e898


PINAU Lionel