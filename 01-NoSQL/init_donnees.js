print("Début de l'initialisation des données");

db = db.getSiblingDB("picard");


const idLasagne = new ObjectId();
const idTiramisu = new ObjectId();
const idFondant = new ObjectId();
const idCarbonara = new ObjectId();

const idLionel = new ObjectId();
const idMarieClaude = new ObjectId();
const idMaxime = new ObjectId();

const idDistributeurIIM = new ObjectId();
const idTransaction1 = new ObjectId();

db.produits.insertMany([
  { _id: idLasagne, name: 'lasagne', categorie: 'plats chaud', prix: 5.99, disponibilité: true },
  { _id: idTiramisu, name: 'tiramisu', categorie: 'plats froid', prix: 3.99, disponibilité: true },
  { _id: idFondant, name: 'fondant au chocolat', categorie: 'plats froid', prix: 2.99, disponibilité: true },
  { _id: idCarbonara, name: 'pate carbonara', categorie: 'plats chaud', prix: 6.99, disponibilité: true }
]);

db.utilisateurs.insertMany([
  { _id: idLionel, nom: 'Pinau', prenom: 'Lionel', email: 'lionel.pinau@gmail.com' },
  { _id: idMarieClaude, nom: 'Siamouroux', prenom: 'Marie-Claude', email: 'siam.mc@gmail.com' },
  { _id: idMaxime, nom: 'Ryckebush', prenom: 'Maxime', email: 'R.M@gmail.com' }
]);

db.distributeurs.insertOne({
  _id: idDistributeurIIM,
  lieu: 'IIM',
  produits: [
    { id_produit: idCarbonara, quantité: 10 },
    { id_produit: idFondant, quantité: 10 }
  ]
});

db.transactions.insertOne({
  _id: idTransaction1,
  id_utilisateur: idMaxime,
  id_distributeur: idDistributeurIIM,
  produits_vendus: [
    { id_produit: idCarbonara, quantité: 2 },
    { id_produit: idFondant, quantité: 2 }
  ],
  total: 19.96
});

print("Fin de l'initialisation des données");
