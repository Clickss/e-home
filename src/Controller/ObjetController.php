<?php

namespace App\Controller;

use App\Entity\Etage;
use App\Entity\Maison;
use App\Entity\Objet;
use App\Entity\ObjetPiece;
use App\Entity\Piece;
use App\Entity\Utilisateur;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/objets")
 */
class ObjetController extends Controller
{
    /**
     * @Route("", name="options_objet")
     * @Route("/{id}", name="optionsid_objet")
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
     * @Route("", name="objet_add")
     * @Method({"PUT"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $objetpiece = $this->get('jms_serializer')->deserialize($data, ObjetPiece::class, 'json');

        var_dump($objetpiece->getObjet()->getId());

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="objet_show")
     * @Method({"GET"})
     */
    public function showAction(Request $request)
    {
        $objet = $this->getDoctrine()->getRepository(Objet::class)->find($request->get('id'));

        if (!$objet) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }
        else {
            $data = $this->get('jms_serializer')->serialize($objet, 'json');

            $response = new Response($data);
            $response->headers->set('Content-Type', 'application/json');
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Headers', '*');
        }

        return $response;
    }

    /**
     * @Route("", name="objet_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $objets = $this->getDoctrine()->getRepository("App:Objet")->findAll();

        $data = $this->get('jms_serializer')->serialize($objets, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}
