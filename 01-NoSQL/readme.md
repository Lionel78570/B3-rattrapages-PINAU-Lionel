# Rattrapage – Base NoSQL

## Introduction : Installation de MongoDB Shell et MongoDB Compass

Pour manipuler la base de données MongoDB et tester vos scripts, vous pouvez utiliser :

- **MongoDB Shell (mongosh)** : interface en ligne de commande pour interagir avec MongoDB.  
  Téléchargez-le ici : https://www.mongodb.com/try/download/shell  
  Une fois installé, vous pouvez lancer `mongosh` depuis votre terminal ou PowerShell.

- **MongoDB Compass** : interface graphique officielle MongoDB, pratique pour visualiser vos bases et collections.  
  Téléchargez-le ici : https://www.mongodb.com/try/download/compass  
  Après installation, connectez-vous à `mongodb://localhost:27017` (par défaut en local) et visualisez la base `picard`.

---

## Objectif du rattrapage

Ce projet répond à la consigne suivante :  
> *"Concevoir une base de données NoSQL adaptée à la gestion des distributeurs automatiques de Picard, permettant de stocker et consulter efficacement les informations liées aux produits, aux stocks et aux historiques de distribution."*

---

### Type de base NoSQL choisi : **MongoDB**

J’ai choisi MongoDB car :
- Il permet de stocker des documents complexes (ex : une transaction avec plusieurs produits) dans un seul objet,
- Il offre une structure flexible, sans schéma rigide,
- Les opérations de lecture/écriture sont rapides,
- Il est bien adapté à des cas comme les stocks ou l’historique d’achats.
- C'est la technologie que nous avions utilisés en cours.

---

### Modélisation des données

4 collections principales ont été créées :
- `produits` : informations produits (nom, prix, disponibilité)
- `utilisateurs` : clients qui achètent dans les distributeurs
- `distributeurs` : emplacement et produits disponibles
- `transactions` : historique des achats, produits achetés, montant total

Chaque document a été structuré pour correspondre à un cas réaliste d'utilisation.  

---

### Jeu de données réaliste

Un fichier `init_donnees.js` est fourni pour insérer les données dans MongoDB.

Il contient :
- Des produits variés (plats chauds, froids)
- Plusieurs utilisateurs
- Un distributeur (IIM) avec du stock
- Une transaction simulée avec calcul du total

Ce script est exécutable avec :
mongosh --db=picard --file init_donnees.js

Après cela lancer mongosh ou mongodb compass, se connecter en local et vérifer que la base picard apparaît bien.

---

### Sources

- https://www.mongodb.com/docs/manual/
- https://youtu.be/c2M-rlkkT5o?si=glQJcDsM4pOlk04h

---

PINAU Lionel