<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * 
     * @Route("/")
     */
    public function index()
    {
        return new Response('
            <html>
                <body>
                    <h1>e-home</h1>
                </body>
            </html>
        ');
    }
    
    /**
     * 
     * @Route("/e-home/test")
     */
    public function show()
    {
        return new Response('
            <html>
                <body>
                    <h1>Objet</h1>
                </body>
            </html>
        ');
    }
}