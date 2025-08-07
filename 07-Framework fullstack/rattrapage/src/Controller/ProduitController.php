<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProduitController extends AbstractController
{
    #[Route('/produit', name: 'app_produits')]
    public function index(): Response
    {
        $produits = [
            [
                'nom' => 'Pizza 4 fromages',
                'prix' => 6.90,
                'quantite' => 12,
            ],
            [
                'nom' => 'Lasagnes Bolognaise',
                'prix' => 5.50,
                'quantite' => 8,
            ],
            [
                'nom' => 'Gratin Dauphinois',
                'prix' => 4.95,
                'quantite' => 15,
            ],
        ];

        return $this->render('produit/index.html.twig', [
            'produits' => $produits,
        ]);
    }
}
