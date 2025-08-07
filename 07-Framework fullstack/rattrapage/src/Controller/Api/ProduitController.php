<?php
namespace App\Controller\Api;

use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProduitController extends AbstractController
{
    #[Route('/api/produits', name: 'api_produits', methods: ['GET'])]
    public function list(ProduitRepository $produitRepository): JsonResponse
    {
        $produits = $produitRepository->findAll();

        $data = array_map(fn($p) => [
            'id' => $p->getId(),
            'nom' => $p->getNom(),
            'description' => $p->getDescription(),
            'prix' => $p->getPrix(),
            'quantiteStock' => $p->getQuantiteStock(),
        ], $produits);

        return $this->json($data);
    }
}
