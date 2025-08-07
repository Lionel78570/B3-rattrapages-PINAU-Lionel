import { createApp, h } from 'vue';
import axios from 'axios';
import './styles/app.css';

const App = {
  data() {
    return {
      produits: [],
      error: null,
      loading: true,

      // Formulaire commande
      produitId: '',
      quantite: 1,
      carteNumero: '',
      dateExpiration: '',

      messageCommande: '',
      erreurCommande: '',
      loadingCommande: false,
    };
  },
  mounted() {
    axios.get('/api/produits')
      .then(res => {
        this.produits = res.data;
        if(this.produits.length > 0) this.produitId = this.produits[0].id; // Prendre 1er produit par défaut
      })
      .catch(() => {
        this.error = 'Erreur lors du chargement des produits';
      })
      .finally(() => {
        this.loading = false;
      });
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
        this.messageCommande = res.data.message + 
          `. Produit: ${res.data.produit}, Quantité: ${res.data.quantite}, Total: ${res.data.total}€`;
        this.carteNumero = '';
        this.dateExpiration = '';
        this.quantite = 1;
      })
      .catch(err => {
        this.erreurCommande = err.response?.data?.error || 'Erreur serveur';
      })
      .finally(() => {
        this.loadingCommande = false;
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
    ]);
  }
};

createApp(App).mount('#app');
