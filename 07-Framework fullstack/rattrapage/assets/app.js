import { createApp, h } from 'vue';
import axios from 'axios';
import './styles/app.css';

const App = {
  data() {
    return {
      produits: [],
      error: null,
      loading: true,
    };
  },
  mounted() {
    axios.get('/api/produits')
      .then(res => {
        this.produits = res.data;
      })
      .catch(() => {
        this.error = 'Erreur lors du chargement des produits';
      })
      .finally(() => {
        this.loading = false;
      });
  },
  render() {
    if (this.loading) {
      return h('div', 'Chargement en cours...');
    }

    if (this.error) {
      return h('div', { style: { color: 'red' } }, this.error);
    }

    if (this.produits.length === 0) {
      return h('div', 'Aucun produit disponible');
    }

    return h('div', [
      h('h1', 'Produits disponibles'),
      h('ul', this.produits.map(produit =>
        h('li', { key: produit.id }, [
          h('strong', `${produit.nom} - ${produit.prix} €`),
          h('p', produit.description),
          h('small', `Stock : ${produit.quantite}`)
        ])
      ))
    ]);
  }
};

createApp(App).mount('#app');
