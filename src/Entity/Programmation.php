<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity(repositoryClass="App\Repository\ProgrammationRepository")
 */
class Programmation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $heure;
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $jour;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ObjetPiece", inversedBy="programmations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $objet_piece;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\AttributObjet", inversedBy="programmations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $attribut_objet;
    public function getId()
    {
        return $this->id;
    }
    public function getHeure(): ?string
    {
        return $this->heure;
    }
    public function setHeure(string $heure): self
    {
        $this->heure = $heure;
        return $this;
    }
    public function getJour(): ?string
    {
        return $this->jour;
    }
    public function setJour(string $jour): self
    {
        $this->jour = $jour;
        return $this;
    }
    public function getObjetPiece(): ?ObjetPiece
    {
        return $this->objet_piece;
    }
    public function setObjetPiece(?ObjetPiece $objet_piece): self
    {
        $this->objet_piece = $objet_piece;
        return $this;
    }
    public function getAttributObjet(): ?AttributObjet
    {
        return $this->attribut_objet;
    }
    public function setAttributObjet(?AttributObjet $attribut_objet): self
    {
        $this->attribut_objet = $attribut_objet;
        return $this;
    }
}