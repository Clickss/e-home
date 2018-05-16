<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity(repositoryClass="App\Repository\EtageRepository")
 *
 * @Serializer\ExclusionPolicy("ALL")
 */
class Etage
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Maison", inversedBy="etages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $maison;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Piece", mappedBy="etage", orphanRemoval=true)
     */
    private $pieces;
    public function __construct()
    {
        $this->pieces = new ArrayCollection();
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
    public function getMaison(): ?Maison
    {
        return $this->maison;
    }
    public function setMaison(?Maison $maison): self
    {
        $this->maison = $maison;
        return $this;
    }
    /**
     * @return Collection|Piece[]
     */
    public function getPieces(): Collection
    {
        return $this->pieces;
    }
    public function addPiece(Piece $piece): self
    {
        if (!$this->pieces->contains($piece)) {
            $this->pieces[] = $piece;
            $piece->setEtage($this);
        }
        return $this;
    }
    public function removePiece(Piece $piece): self
    {
        if ($this->pieces->contains($piece)) {
            $this->pieces->removeElement($piece);
            // set the owning side to null (unless already changed)
            if ($piece->getEtage() === $this) {
                $piece->setEtage(null);
            }
        }
        return $this;
    }
}