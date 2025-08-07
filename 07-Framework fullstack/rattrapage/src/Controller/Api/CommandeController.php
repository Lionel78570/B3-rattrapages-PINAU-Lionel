<?php
namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CommandeController extends AbstractController
{
    #[Route('/api/commandes', name: 'api_commandes', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['produitId']) || empty($data['quantite']) || empty($data['carteNumero']) || empty($data['dateExpiration'])) {
            return $this->json(['error' => 'Données manquantes'], 400);
        }

        if (!preg_match('/^\d{16}$/', $data['carteNumero'])) {
            return $this->json(['error' => 'Numéro de carte invalide'], 400);
        }

        if (!preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $data['dateExpiration'])) {
            return $this->json(['error' => 'Date d\'expiration invalide'], 400);
        }

        $produits = [
            1 => ['nom' => 'Pizza 4 fromages', 'prix' => 4.99, 'quantite' => 10],
            2 => ['nom' => 'Lasagnes végétariennes', 'prix' => 5.49, 'quantite' => 5],
            3 => ['nom' => 'Nuggets de poulet', 'prix' => 3.99, 'quantite' => 8],
        ];

        $produitId = $data['produitId'];
        $quantite = (int) $data['quantite'];

        if (!isset($produits[$produitId])) {
            return $this->json(['error' => 'Produit non trouvé'], 404);
        }

        $produit = $produits[$produitId];
        $total = $produit['prix'] * $quantite;

        return $this->json([
            'message' => 'Commande passée avec succès',
            'produit' => $produit['nom'],
            'quantite' => $quantite,
            'total' => $total,
        ]);
    }
}
