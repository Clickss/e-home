<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity(repositoryClass="App\Repository\EtatRepository")
 */
class Etat
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
    private $lib_etat_oui;
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lib_etat_non;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\AttributObjet", mappedBy="etat")
     */
    private $attributObjets;
    public function __construct()
    {
        $this->attributObjets = new ArrayCollection();
    }
    public function getId()
    {
        return $this->id;
    }
    public function getLibEtatOui(): ?string
    {
        return $this->lib_etat_oui;
    }
    public function setLibEtatOui(string $lib_etat_oui): self
    {
        $this->lib_etat_oui = $lib_etat_oui;
        return $this;
    }
    public function getLibEtatNon(): ?string
    {
        return $this->lib_etat_non;
    }
    public function setLibEtatNon(string $lib_etat_non): self
    {
        $this->lib_etat_non = $lib_etat_non;
        return $this;
    }
    /**
     * @return Collection|AttributObjet[]
     */
    public function getAttributObjets(): Collection
    {
        return $this->attributObjets;
    }
    public function addAttributObjet(AttributObjet $attributObjet): self
    {
        if (!$this->attributObjets->contains($attributObjet)) {
            $this->attributObjets[] = $attributObjet;
            $attributObjet->setEtat($this);
        }
        return $this;
    }
    public function removeAttributObjet(AttributObjet $attributObjet): self
    {
        if ($this->attributObjets->contains($attributObjet)) {
            $this->attributObjets->removeElement($attributObjet);
            // set the owning side to null (unless already changed)
            if ($attributObjet->getEtat() === $this) {
                $attributObjet->setEtat(null);
            }
        }
        return $this;
    }
}