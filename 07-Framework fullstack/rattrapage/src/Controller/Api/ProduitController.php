<?php
namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProduitController extends AbstractController
{
    #[Route('/api/produits', name: 'api_produits', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $produits = [
            ['id' => 1, 'nom' => 'Pizza 4 fromages', 'prix' => 5, 'quantite' => 10],
            ['id' => 2, 'nom' => 'Lasagnes Bolognaise', 'prix' => 10, 'quantite' => 5],
            ['id' => 3, 'nom' => 'Gratin Dauphinois', 'prix' => 15, 'quantite' => 8],
        ];

        return $this->json($produits);
    }
}
