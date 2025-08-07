<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProduitPageController extends AbstractController
{
    #[Route('/produits', name: 'produits_index')]
    public function index(): Response
    {
        return $this->render('produits/index.html.twig');
    }
}
