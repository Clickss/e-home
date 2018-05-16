<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity(repositoryClass="App\Repository\AmbianceRepository")
 */
class Ambiance
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
    private $nom;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Piece", inversedBy="ambiances")
     * @ORM\JoinColumn(nullable=false)
     */
    private $piece;
    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ObjetPiece", mappedBy="ambiances")
     */
    private $objetPieces;
    public function __construct()
    {
        $this->objetPieces = new ArrayCollection();
    }
    public function getId()
    {
        return $this->id;
    }
    public function getNom(): ?string
    {
        return $this->nom;
    }
    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }
    public function getPiece(): ?Piece
    {
        return $this->piece;
    }
    public function setPiece(?Piece $piece): self
    {
        $this->piece = $piece;
        return $this;
    }
    /**
     * @return Collection|ObjetPiece[]
     */
    public function getObjetPieces(): Collection
    {
        return $this->objetPieces;
    }
    public function addObjetPiece(ObjetPiece $objetPiece): self
    {
        if (!$this->objetPieces->contains($objetPiece)) {
            $this->objetPieces[] = $objetPiece;
            $objetPiece->addAmbiance($this);
        }
        return $this;
    }
    public function removeObjetPiece(ObjetPiece $objetPiece): self
    {
        if ($this->objetPieces->contains($objetPiece)) {
            $this->objetPieces->removeElement($objetPiece);
            $objetPiece->removeAmbiance($this);
        }
        return $this;
    }
}