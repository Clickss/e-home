<?php

namespace App\Controller;

use App\Entity\Etage;
use App\Entity\Maison;
use App\Entity\Objet;
use App\Entity\ObjetPiece;
use App\Entity\Piece;
use App\Entity\Utilisateur;
use App\Entity\ValeursObjet;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/utilisateurs/{id_u}/maisons/{id_m}/etages/{id_e}/pieces/{id_p}/objets")
 */
class ObjetPieceController extends Controller
{
    /**
     * @Route("", name="options_objetpiece")
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
     * @Route("", name="objetpiece_add")
     * @Method({"POST"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $objetpiece = $this->get('jms_serializer')->deserialize($data, ObjetPiece::class, 'json');

        $piece = $this->getDoctrine()->getRepository(Piece::class)->find($request->get('id_p'));
        $objet = $this->getDoctrine()->getRepository(Objet::class)->find($objetpiece->getObjet()->getId());

        $objetpiece->setObjet($objet);

        $objetpiece->setPiece($piece);

        $valeurs_objet = new ValeursObjet();

        if($objetpiece->getObjet()->getAttributObjet()->getSlider() != null)
        {
            $valeurs_objet->setValSlider(0);
        }
        if($objetpiece->getObjet()->getAttributObjet()->getEtat() != null)
        {
            $valeurs_objet->setValEtat(1);
        }
        $em = $this->getDoctrine()->getManager();
        $em->persist($valeurs_objet);
        $objetpiece->setValeursObjet($valeurs_objet);


        $em->persist($objetpiece);
        $em->flush();

        $data = $this->get('jms_serializer')->serialize($objetpiece, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }

    /**
     * @Route("/{id}", name="objetpiece_show")
     * @Method({"GET"})
     */
    public function showAction(Request $request)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id_m'));
        $etage = $this->getDoctrine()->getRepository(Etage::class)->find($request->get('id_e'));
        $piece = $this->getDoctrine()->getRepository(Piece::class)->find($request->get('id_p'));
        $objetPiece = $this->getDoctrine()->getRepository(ObjetPiece::class)->findOneBy(["piece" => $request->get('id_p'), "objet" => $request->get('id')]);

        if (!$objetPiece) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }
        else {
            if($etage != $objetPiece->getPiece()->getEtage() || $maison != $objetPiece->getPiece()->getEtage()->getMaison() || $utilisateur != $piece->getEtage()->getMaison()->getUtilisateur())
            {
                throw $this->createNotFoundException(
                    $response = new Response('', Response::HTTP_NOT_FOUND)
                );
            }
            else {
                $data = $this->get('jms_serializer')->serialize($objetPiece->getObjet(), 'json');

                $response = new Response($data);
                $response->headers->set('Content-Type', 'application/json');
                $response->headers->set('Access-Control-Allow-Origin', '*');
                $response->headers->set('Access-Control-Allow-Headers', '*');
            }
        }

        return $response;
    }
    
    /**
     * @Route("/{id}", name="objetpiece_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $objetpiece = $this->getDoctrine()->getRepository(ObjetPiece::class)->find($id);
        
        if (!$objetpiece) {
            throw $this->createNotFoundException(sprintf(
                'Piece inconnue'
            ));
        }
        else
        {
            $em = $this->getDoctrine()->getManager();
            $em->remove($objetpiece);
            $em->flush();
        }

        return new Response(null, Response::HTTP_OK);
    }

    /**
     * @Route("", name="objetpiece_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $objetPieces = $this->getDoctrine()->getRepository("App:ObjetPiece")->findBy(["piece" => $request->get('id_p')]);

        $objets = array();
        foreach ($objetPieces as $objetPiece) {
            array_push($objets, $objetPiece);
        }

        $data = $this->get('jms_serializer')->serialize($objets, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}
