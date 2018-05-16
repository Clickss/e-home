<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity(repositoryClass="App\Repository\PieceRepository")
 *
 * @Serializer\ExclusionPolicy("ALL")
 */
class Piece
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Serializer\Expose
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Serializer\Expose
     */
    private $nom;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Etage", inversedBy="pieces")
     * @ORM\JoinColumn(nullable=false)
     */
    private $etage;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Ambiance", mappedBy="piece", orphanRemoval=true)
     */
    private $ambiances;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ObjetPiece", mappedBy="piece", orphanRemoval=true)
     */
    private $objetPieces;
    public function __construct()
    {
        $this->ambiances = new ArrayCollection();
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
    public function getEtage(): ?Etage
    {
        return $this->etage;
    }
    public function setEtage(?Etage $etage): self
    {
        $this->etage = $etage;
        return $this;
    }
    /**
     * @return Collection|Ambiance[]
     */
    public function getAmbiances(): Collection
    {
        return $this->ambiances;
    }
    public function addAmbiance(Ambiance $ambiance): self
    {
        if (!$this->ambiances->contains($ambiance)) {
            $this->ambiances[] = $ambiance;
            $ambiance->setPiece($this);
        }
        return $this;
    }
    public function removeAmbiance(Ambiance $ambiance): self
    {
        if ($this->ambiances->contains($ambiance)) {
            $this->ambiances->removeElement($ambiance);
            // set the owning side to null (unless already changed)
            if ($ambiance->getPiece() === $this) {
                $ambiance->setPiece(null);
            }
        }
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
            $objetPiece->setPiece($this);
        }
        return $this;
    }
    public function removeObjetPiece(ObjetPiece $objetPiece): self
    {
        if ($this->objetPieces->contains($objetPiece)) {
            $this->objetPieces->removeElement($objetPiece);
            // set the owning side to null (unless already changed)
            if ($objetPiece->getPiece() === $this) {
                $objetPiece->setPiece(null);
            }
        }
        return $this;
    }
}