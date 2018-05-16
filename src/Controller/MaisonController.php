<?php

namespace App\Controller;

use App\Entity\Maison;
use App\Entity\Utilisateur;
use App\Form\MaisonType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/utilisateurs/{id_u}/maisons")
 */
class MaisonController extends Controller
{
    /**
     * @Route("", name="options_maison")
     * @Route("/{id}", name="optionsid_maison")
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
     * @Route("", name="maison_add")
     * @Method({"PUT"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $maison = $this->get('jms_serializer')->deserialize($data, Maison::class, 'json');

        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison->setUtilisateur($utilisateur);

        $em = $this->getDoctrine()->getManager();
        $em->persist($maison);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="maison_show")
     * @Method({"GET"})
     */
    public function showAction(Request $request)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id'));

        if (!$maison) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }
        else {
            if($utilisateur != $maison->getUtilisateur()){
                throw $this->createNotFoundException(
                    $response = new Response('', Response::HTTP_NOT_FOUND)
                );
            }
            else {
                $data = $this->get('jms_serializer')->serialize($maison, 'json');

                $response = new Response($data);
                $response->headers->set('Content-Type', 'application/json');
                $response->headers->set('Access-Control-Allow-Origin', '*');
                $response->headers->set('Access-Control-Allow-Headers', '*');
            }
        }

        return $response;
    }

    /**
     * @Route("/{id}", name="maison_edit")
     * @Method({"PUT"})
     */
    public function editAction(Request $request)
    {
        $maison = $this->getDoctrine()->getManager()->getRepository(Maison::class)->find($request->get('id'));

        if (!$maison) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }

        $data = $this->get('jms_serializer')->deserialize($request->getContent(), Maison::class, 'json');

        $form = $this->createForm(MaisonType::class, $maison);
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
     * @Route("/{id}", name="maison_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($id);

        if (!$maison) {
            throw $this->createNotFoundException(sprintf(
                'Maison inconnue'
            ));
        }
        else
        {
            $em = $this->getDoctrine()->getManager();
            $em->remove($maison);
            $em->flush();
        }

        return new Response(null, Response::HTTP_OK);
    }

    /**
     * @Route("", name="maison_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $maisons = $this->getDoctrine()->getRepository("App:Maison")->findBy(["utilisateur" => $request->get('id_u')]);

        $data = $this->get('jms_serializer')->serialize($maisons, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}