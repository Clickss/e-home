<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity(repositoryClass="App\Repository\ObjetRepository")
 *
 * @Serializer\ExclusionPolicy("ALL")
 */
class Objet
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
     * @ORM\Column(type="string", length=255)
     *
     * @Serializer\Expose
     */
    private $image;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\AttributObjet", inversedBy="objets")
     * @ORM\JoinColumn(nullable=false)
     */
    private $attribut_objet;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ObjetPiece", mappedBy="objet", orphanRemoval=true)
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
    public function getImage(): ?string
    {
        return $this->image;
    }
    public function setImage(string $image): self
    {
        $this->image = $image;
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
            $objetPiece->setObjet($this);
        }
        return $this;
    }
    public function removeObjetPiece(ObjetPiece $objetPiece): self
    {
        if ($this->objetPieces->contains($objetPiece)) {
            $this->objetPieces->removeElement($objetPiece);
            // set the owning side to null (unless already changed)
            if ($objetPiece->getObjet() === $this) {
                $objetPiece->setObjet(null);
            }
        }
        return $this;
    }
}