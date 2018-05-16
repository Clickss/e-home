<?php
/**
 * Created by PhpStorm.
 * User: vincentpochon
 * Date: 30/04/2018
 * Time: 20:59
 */

namespace App\Controller;


use App\Entity\Etage;
use App\Entity\Maison;
use App\Entity\Piece;
use App\Entity\Utilisateur;
use App\Form\EtageType;
use App\Form\PieceType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/utilisateurs/{id_u}/maisons/{id_m}/etages/{id_e}/pieces")
 */
class PieceController extends Controller
{
    /**
     * @Route("", name="options_piece")
     * @Route("/{id}", name="optionsid_piece")
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
     * @Route("", name="piece_add")
     * @Method({"PUT"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $piece = $this->get('jms_serializer')->deserialize($data, Piece::class, 'json');

        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id_m'));
        $etage = $this->getDoctrine()->getRepository(Etage::class)->find($request->get('id_e'));

        $maison->setUtilisateur($utilisateur);
        $etage->setMaison($maison);
        $piece->setEtage($etage);

        $em = $this->getDoctrine()->getManager();
        $em->persist($piece);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="piece_show")
     * @Method({"GET"})
     */
    public function showAction(Request $request)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id_m'));
        $etage = $this->getDoctrine()->getRepository(Etage::class)->find($request->get('id_e'));
        $piece = $this->getDoctrine()->getRepository(Piece::class)->find($request->get('id'));

        if (!$piece) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }
        else {
            if($etage != $piece->getEtage() || $maison != $piece->getEtage()->getMaison() || $utilisateur != $piece->getEtage()->getMaison()->getUtilisateur())
            {
                throw $this->createNotFoundException(
                    $response = new Response('', Response::HTTP_NOT_FOUND)
                );
            }
            else {
                $data = $this->get('jms_serializer')->serialize($piece, 'json');

                $response = new Response($data);
                $response->headers->set('Content-Type', 'application/json');
                $response->headers->set('Access-Control-Allow-Origin', '*');
                $response->headers->set('Access-Control-Allow-Headers', '*');
            }
        }

        return $response;
    }

    /**
     * @Route("/{id}", name="piece_edit")
     * @Method({"PUT"})
     */
    public function editAction(Request $request)
    {
        $piece = $this->getDoctrine()->getManager()->getRepository(Piece::class)->find($request->get('id'));

        if (!$piece) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }

        $data = $this->get('jms_serializer')->deserialize($request->getContent(), Piece::class, 'json');

        $form = $this->createForm(PieceType::class, $piece);
        $form->submit(array(
            "nom" => $data->getNom()
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
     * @Route("/{id}", name="piece_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $piece = $this->getDoctrine()->getRepository(Piece::class)->find($id);

        if (!$piece) {
            throw $this->createNotFoundException(sprintf(
                'Piece inconnue'
            ));
        }
        else
        {
            $em = $this->getDoctrine()->getManager();
            $em->remove($piece);
            $em->flush();
        }

        return new Response(null, Response::HTTP_OK);
    }

    /**
     * @Route("", name="piece_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $pieces = $this->getDoctrine()->getRepository("App:Piece")->findBy(["etage" => $request->get('id_e')]);

        $data = $this->get('jms_serializer')->serialize($pieces, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}