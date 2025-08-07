<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class FideliteController extends AbstractController
{
    #[Route('/api/fidelite/creer', name: 'api_fidelite_creer', methods: ['POST'])]
    public function creerCompte(Request $request, SessionInterface $session): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['nom'])) {
            return $this->json(['error' => 'Nom ou email manquant'], 400);
        }

        $comptesFidelite = $session->get('comptesFidelite', []);

        $email = $data['email'];

        if (isset($comptesFidelite[$email])) {
            return $this->json(['error' => 'Compte déjà existant'], 400);
        }

        $compte = [
            'nom' => $data['nom'],
            'prenom' => $data['prenom'] ?? '',
            'email' => $email,
            'points' => 0,
        ];

        $comptesFidelite[$email] = $compte;
        $session->set('comptesFidelite', $comptesFidelite);

        return $this->json([
            'message' => 'Compte de fidélité créé avec succès',
            'compte' => $compte,
        ]);
    }

    #[Route('/api/fidelite/consulter', name: 'api_fidelite_consulter', methods: ['GET'])]
    public function consulterCompte(Request $request, SessionInterface $session): JsonResponse
    {
        $email = $request->query->get('email');

        if (empty($email)) {
            return $this->json(['error' => 'Email manquant'], 400);
        }

        $comptesFidelite = $session->get('comptesFidelite', []);

        if (!isset($comptesFidelite[$email])) {
            return $this->json(['error' => 'Compte non trouvé'], 404);
        }

        return $this->json([
            'message' => 'Compte trouvé',
            'compte' => $comptesFidelite[$email],
        ]);
    }
}
