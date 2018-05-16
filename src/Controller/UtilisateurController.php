<?php

namespace App\Controller;

use App\Entity\Maison;
use App\Entity\Utilisateur;
use App\Form\MaisonType;
use App\Form\UtilisateurType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/utilisateurs")
 */
class UtilisateurController extends Controller
{
    /**
     * @Route("", name="options_utilisateur")
     * @Route("/{id}", name="optionsid_utilisateur")
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
     * @Route("", name="utilisateur_add")
     * @Method({"PUT"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $utilisateur = $this->get('jms_serializer')->deserialize($data, Utilisateur::class, 'json');

        $em = $this->getDoctrine()->getManager();
        $em->persist($utilisateur);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="utilisateur_show")
     * @Method({"GET"})
     */
    public function showAction($id)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($id);

        if (!$utilisateur) {
            $response = new Response('', Response::HTTP_NOT_FOUND);
        }
        else {
            $data = $this->get('jms_serializer')->serialize($utilisateur, 'json');

            $response = new Response($data);
            $response->headers->set('Content-Type', 'application/json');
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Headers', '*');
        }

        return $response;
    }

    /**
     * @Route("/{id}", name="utilisateur_edit")
     * @Method({"PUT"})
     */
    public function editAction(Request $request)
    {
        $utilisateur = $this->getDoctrine()->getManager()->getRepository(Utilisateur::class)->find($request->get('id'));

        if (!$utilisateur) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }

        $data = $this->get('jms_serializer')->deserialize($request->getContent(), Utilisateur::class, 'json');

        $form = $this->createForm(UtilisateurType::class, $utilisateur);
        $form->submit(array(
            "nom" => $data->getNom(),
            "prenom" => $data->getPrenom(),
            "mail" => $data->getMail(),
            "mdp" => $data->getMdp()
        ));

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            return new Response(null, Response::HTTP_OK);
        } else {
            return new Response(null, Response::HTTP_NOT_MODIFIED);
        }


    }

    /**
     * @Route("/{id}", name="utilisateur_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($id);

        if (!$utilisateur) {
            throw $this->createNotFoundException(sprintf(
                'Utilisateur inconnue'
            ));
        }
        else
        {
            $em = $this->getDoctrine()->getManager();
            $em->remove($utilisateur);
            $em->flush();
        }

        return new Response(null, Response::HTTP_OK);
    }

    /**
     * @Route("", name="utilisateur_list")
     * @Method({"GET"})
     */
    public function listAction()
    {
        $utilisateurs = $this->getDoctrine()->getRepository("App:Utilisateur")->findAll();

        $data = $this->get('jms_serializer')->serialize($utilisateurs, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}