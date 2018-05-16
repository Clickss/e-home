<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use App\Entity\Utilisateur;

/**
 * @Route("/api/auth")
 */
class AuthentificationController extends Controller {

    /**
     * @Route("", name="options_auth")
     * @Method({"OPTIONS"})
     */
    public function optionsAction(Request $request)
    {
        $response = new Response(json_encode("Ok"), Response::HTTP_OK);
        $response->headers->set('Content-Type', 'text/plain');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');
        return $response;
    }
    
    /**
     * @Route("", name="authentification")
     * @Method({"POST"})
     */
    public function authentificationAction(Request $request)
    {
        $data = $this->get('jms_serializer')->deserialize($request->getContent(), Utilisateur::class, 'json');
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->findBy(['mail' => $data->getMail(), 'mdp' => $data->getMdp()]);
        
        if(count($utilisateur) != 0)
        {
            $retour = array(
                "id" => $utilisateur[0]->getId(),
                "nom" => $utilisateur[0]->getNom(),
                "prenom" => $utilisateur[0]->getPrenom(),
                "mail" => $utilisateur[0]->getMail(),
                "mdp" => $utilisateur[0]->getMdp(),
                "token" => "token",
            );
        }
        else
        {
            $retour = false;
        }

        $response = new Response(json_encode($retour), Response::HTTP_OK);
        $response->headers->set('Content-Type', 'text/plain');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');
        
        return $response;
    }
}
