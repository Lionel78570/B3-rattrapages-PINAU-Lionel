import { createApp, h } from 'vue';
import axios from 'axios';
import './styles/app.css';

const App = {
  data() {
    return {
      produits: [],
      error: null,
      loading: true,

      produitId: '',
      quantite: 1,
      carteNumero: '',
      dateExpiration: '',

      messageCommande: '',
      erreurCommande: '',
      loadingCommande: false,

      nomClient: '',
      prenomClient: '',
      emailClient: '',
      messageFidelite: '',
      erreurFidelite: '',
      compteTrouve: null,
      emailRecherche: '',

      historiqueCommandes: [],
      loadingHistorique: false,
      erreurHistorique: '',
    };
  },
  mounted() {
    axios.get('/api/produits')
      .then(res => {
        this.produits = res.data;
        if (this.produits.length > 0) this.produitId = this.produits[0].id;
      })
      .catch(() => {
        this.error = 'Erreur lors du chargement des produits';
      })
      .finally(() => {
        this.loading = false;
      });

    this.chargerHistorique();
  },
  methods: {
    passerCommande() {
      this.erreurCommande = '';
      this.messageCommande = '';
      this.loadingCommande = true;

      axios.post('/api/commandes', {
        produitId: this.produitId,
        quantite: this.quantite,
        carteNumero: this.carteNumero,
        dateExpiration: this.dateExpiration,
      })
        .then(res => {
          const data = res.data;
          this.messageCommande = `${data.message}. Produit: ${data.produit}, Quantité: ${data.quantite}, Total: ${data.total}€`;
          this.carteNumero = '';
          this.dateExpiration = '';
          this.quantite = 1;
          this.chargerHistorique(); // Recharge l'historique après une commande
        })
        .catch(err => {
          this.erreurCommande = err.response?.data?.error || 'Erreur serveur';
        })
        .finally(() => {
          this.loadingCommande = false;
        });
    },

    creerCompteFidelite() {
      this.erreurFidelite = '';
      this.messageFidelite = '';

      if (!this.nomClient || !this.emailClient) {
        this.erreurFidelite = "Veuillez renseigner nom et email";
        return;
      }

      axios.post('/api/fidelite/creer', {
        nom: this.nomClient,
        prenom: this.prenomClient,
        email: this.emailClient,
      })
        .then(res => {
          this.messageFidelite = res.data.message;
          this.nomClient = '';
          this.prenomClient = '';
          this.emailClient = '';
        })
        .catch(err => {
          this.erreurFidelite = err.response?.data?.error || "Erreur lors de la création du compte";
        });
    },

    consulterCompteFidelite() {
      this.compteTrouve = null;
      this.erreurFidelite = '';
      this.messageFidelite = '';

      if (!this.emailRecherche) {
        this.erreurFidelite = "Veuillez entrer un email pour la recherche.";
        return;
      }

      axios.get('/api/fidelite/consulter', { params: { email: this.emailRecherche } })
        .then(res => {
          this.compteTrouve = res.data.compte;
          this.messageFidelite = "Compte trouvé !";
        })
        .catch(() => {
          this.erreurFidelite = "Aucun compte trouvé avec cet email.";
          this.compteTrouve = null;
        });
    },

    chargerHistorique() {
      this.loadingHistorique = true;
      this.erreurHistorique = '';
      axios.get('/api/commandes/historique')
        .then(res => {
          this.historiqueCommandes = res.data.historique || [];
        })
        .catch(() => {
          this.erreurHistorique = 'Erreur lors du chargement de l\'historique.';
        })
        .finally(() => {
          this.loadingHistorique = false;
        });
    }
  },
  render() {
    if (this.loading) {
      return h('div', 'Chargement en cours...');
    }

    if (this.error) {
      return h('div', { style: { color: 'red' } }, this.error);
    }

    return h('div', [
      h('h1', 'Produits disponibles'),
      h('ul', this.produits.map(produit =>
        h('li', { key: produit.id }, [
          h('strong', `${produit.nom} - ${produit.prix} €`),
          h('p', produit.description || ''),
          h('small', `Stock : ${produit.quantite || 'N/A'}`)
        ])
      )),

      h('hr'),
      h('h2', 'Passer une commande'),
      h('div', [
        h('label', 'Produit : '),
        h('select', {
          value: this.produitId,
          onChange: e => this.produitId = e.target.value,
        }, this.produits.map(p =>
          h('option', { value: p.id }, p.nom)
        )),
      ]),

      h('div', [
        h('label', 'Quantité : '),
        h('input', {
          type: 'number', min: 1, value: this.quantite,
          onInput: e => this.quantite = parseInt(e.target.value) || 1
        })
      ]),

      h('div', [
        h('label', 'Numéro de carte : '),
        h('input', {
          type: 'text', maxlength: 16, value: this.carteNumero,
          onInput: e => this.carteNumero = e.target.value
        })
      ]),

      h('div', [
        h('label', 'Date d\'expiration (MM/AA) : '),
        h('input', {
          type: 'text', placeholder: 'MM/AA', value: this.dateExpiration,
          onInput: e => this.dateExpiration = e.target.value
        })
      ]),

      h('button', {
        disabled: this.loadingCommande,
        onClick: this.passerCommande,
      }, this.loadingCommande ? 'Envoi...' : 'Commander'),

      this.messageCommande ? h('p', { style: { color: 'green' } }, this.messageCommande) : null,
      this.erreurCommande ? h('p', { style: { color: 'red' } }, this.erreurCommande) : null,

      h('hr'),
      h('h2', 'Créer un compte fidélité'),

      h('div', [
        h('label', 'Nom : '),
        h('input', {
          type: 'text', value: this.nomClient,
          onInput: e => this.nomClient = e.target.value
        })
      ]),

      h('div', [
        h('label', 'Prénom : '),
        h('input', {
          type: 'text', value: this.prenomClient,
          onInput: e => this.prenomClient = e.target.value
        })
      ]),

      h('div', [
        h('label', 'Email : '),
        h('input', {
          type: 'email', value: this.emailClient,
          onInput: e => this.emailClient = e.target.value
        })
      ]),

      h('button', { onClick: this.creerCompteFidelite }, 'Créer mon compte'),

      h('div', [
        h('h3', 'Consulter un compte fidélité'),
        h('input', {
          type: 'email', placeholder: 'Email du client', value: this.emailRecherche,
          onInput: e => this.emailRecherche = e.target.value
        }),
        h('button', { onClick: this.consulterCompteFidelite }, 'Rechercher')
      ]),

      this.compteTrouve
        ? h('p', `Compte de ${this.compteTrouve.nom} ${this.compteTrouve.prenom}, Points : ${this.compteTrouve.points}`)
        : null,

      this.messageFidelite ? h('p', { style: { color: 'green' } }, this.messageFidelite) : null,
      this.erreurFidelite ? h('p', { style: { color: 'red' } }, this.erreurFidelite) : null,

      h('hr'),
      h('h2', 'Historique des commandes'),

      this.loadingHistorique
        ? h('p', 'Chargement de l\'historique...')
        : this.erreurHistorique
          ? h('p', { style: { color: 'red' } }, this.erreurHistorique)
          : this.historiqueCommandes.length === 0
            ? h('p', 'Aucune commande passée.')
            : h('ul', this.historiqueCommandes.map((cmd, index) =>
                h('li', { key: index }, `${cmd.date} - ${cmd.produit} x${cmd.quantite} - Total : ${cmd.total}€`)
              )),
    ]);
  }
};

createApp(App).mount('#app');
