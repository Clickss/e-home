<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ValeursObjetRepository")
 */
class ValeursObjet
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $val_etat;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $val_slider;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ObjetPiece", inversedBy="valeursObjet", cascade={"persist", "remove"})
     */
    private $objetpiece;

    public function getId()
    {
        return $this->id;
    }

    public function getValEtat(): ?bool
    {
        return $this->val_etat;
    }

    public function setValEtat(?bool $val_etat): self
    {
        $this->val_etat = $val_etat;

        return $this;
    }

    public function setValSlider(?int $val_slider): self
    {
        $this->val_slider = $val_slider;

        return $this;
    }

    public function getValSlider(): ?int
    {
        return $this->val_slider;
    }

    public function getObjetpiece(): ?ObjetPiece
    {
        return $this->objetpiece;
    }

    public function setObjetpiece(?ObjetPiece $objetpiece): self
    {
        $this->objetpiece = $objetpiece;

        return $this;
    }
}
