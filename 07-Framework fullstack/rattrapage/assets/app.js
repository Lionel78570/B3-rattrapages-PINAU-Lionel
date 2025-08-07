import './bootstrap.js';
import './styles/app.css';

import { createApp } from 'vue';
import axios from 'axios';

const App = {
  data() {
    return {
      produits: [],
      error: null,
    };
  },
  mounted() {
    axios.get('/api/produits')
      .then(res => this.produits = res.data)
      .catch(err => this.error = 'Erreur lors du chargement des produits');
  },
  template: `
    <div>
      <h1>Produits disponibles</h1>
      <div v-if="error" style="color: red">{{ error }}</div>
      <ul v-if="produits.length">
        <li v-for="produit in produits" :key="produit.id">
          <strong>{{ produit.nom }}</strong> - {{ produit.prix }} €
          <p>{{ produit.description }}</p>
          <small>Stock : {{ produit.quantiteStock }}</small>
        </li>
      </ul>
      <div v-else>Aucun produit disponible</div>
    </div>
  `
};

createApp(App).mount('#app');
