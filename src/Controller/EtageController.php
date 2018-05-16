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
use App\Entity\Utilisateur;
use App\Form\EtageType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/utilisateurs/{id_u}/maisons/{id_m}/etages")
 */
class EtageController extends Controller
{
    /**
     * @Route("", name="options_etage")
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
     * @Route("", name="etage_add")
     * @Method({"PUT"})
     */
    public function addAction(Request $request)
    {
        $data = $request->getContent();
        $etage = $this->get('jms_serializer')->deserialize($data, Etage::class, 'json');

        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id_m'));

        $maison->setUtilisateur($utilisateur);
        $etage->setMaison($maison);

        $em = $this->getDoctrine()->getManager();
        $em->persist($etage);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="etage_show")
     * @Method({"GET"})
     */
    public function showAction(Request $request)
    {
        $utilisateur = $this->getDoctrine()->getRepository(Utilisateur::class)->find($request->get('id_u'));
        $maison = $this->getDoctrine()->getRepository(Maison::class)->find($request->get('id_m'));
        $etage = $this->getDoctrine()->getRepository(Etage::class)->find($request->get('id'));

        if (!$etage) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }
        else {
            if($maison != $etage->getMaison() || $utilisateur != $etage->getMaison()->getUtilisateur())
            {
                throw $this->createNotFoundException(
                    $response = new Response('', Response::HTTP_NOT_FOUND)
                );
            }
            else {
                $data = $this->get('jms_serializer')->serialize($etage, 'json');

                $response = new Response($data);
                $response->headers->set('Content-Type', 'application/json');
                $response->headers->set('Access-Control-Allow-Origin', '*');
                $response->headers->set('Access-Control-Allow-Headers', '*');
            }
        }

        return $response;
    }

    /**
     * @Route("/{id}", name="etage_edit")
     * @Method({"PUT"})
     */
    public function editAction(Request $request)
    {
        $etage = $this->getDoctrine()->getManager()->getRepository(Etage::class)->find($request->get('id'));

        if (!$etage) {
            throw $this->createNotFoundException(
                $response = new Response('', Response::HTTP_NOT_FOUND)
            );
        }

        $data = $this->get('jms_serializer')->deserialize($request->getContent(), Etage::class, 'json');

        $form = $this->createForm(EtageType::class, $etage);
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
     * @Route("/{id}", name="etage_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $etage = $this->getDoctrine()->getRepository(Etage::class)->find($id);

        if (!$etage) {
            throw $this->createNotFoundException(sprintf(
                'Etage inconnue'
            ));
        }
        else
        {
            $em = $this->getDoctrine()->getManager();
            $em->remove($etage);
            $em->flush();
        }

        return new Response(null, Response::HTTP_OK);
    }

    /**
     * @Route("", name="etage_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $etages = $this->getDoctrine()->getRepository("App:Etage")->findBy(["maison" => $request->get('id_m')]);

        $data = $this->get('jms_serializer')->serialize($etages, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', '*');

        return $response;
    }
}