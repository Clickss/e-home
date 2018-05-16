<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AttributObjetRepository")
 */
class AttributObjet
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
    private $couleur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Slider", inversedBy="attributObjets")
     */
    private $slider;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Etat", inversedBy="attributObjets")
     */
    private $etat;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Objet", mappedBy="attribut_objet", orphanRemoval=true)
     */
    private $objets;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Programmation", mappedBy="attribut_objet", orphanRemoval=true)
     */
    private $programmations;

    public function __construct()
    {
        $this->objets = new ArrayCollection();
        $this->programmations = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): self
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getSlider(): ?Slider
    {
        return $this->slider;
    }

    public function setSlider(?Slider $slider): self
    {
        $this->slider = $slider;

        return $this;
    }

    public function getEtat(): ?Etat
    {
        return $this->etat;
    }

    public function setEtat(?Etat $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    /**
     * @return Collection|Objet[]
     */
    public function getObjets(): Collection
    {
        return $this->objets;
    }

    public function addObjet(Objet $objet): self
    {
        if (!$this->objets->contains($objet)) {
            $this->objets[] = $objet;
            $objet->setAttributObjet($this);
        }

        return $this;
    }

    public function removeObjet(Objet $objet): self
    {
        if ($this->objets->contains($objet)) {
            $this->objets->removeElement($objet);
            // set the owning side to null (unless already changed)
            if ($objet->getAttributObjet() === $this) {
                $objet->setAttributObjet(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Programmation[]
     */
    public function getProgrammations(): Collection
    {
        return $this->programmations;
    }

    public function addProgrammation(Programmation $programmation): self
    {
        if (!$this->programmations->contains($programmation)) {
            $this->programmations[] = $programmation;
            $programmation->setAttributObjet($this);
        }

        return $this;
    }

    public function removeProgrammation(Programmation $programmation): self
    {
        if ($this->programmations->contains($programmation)) {
            $this->programmations->removeElement($programmation);
            // set the owning side to null (unless already changed)
            if ($programmation->getAttributObjet() === $this) {
                $programmation->setAttributObjet(null);
            }
        }

        return $this;
    }
}
