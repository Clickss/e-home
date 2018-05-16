<?php
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity(repositoryClass="App\Repository\UtilisateurRepository")
 *
 * @Serializer\ExclusionPolicy("ALL")
 */
class Utilisateur
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
    private $prenom;
    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Serializer\Expose
     */
    private $mail;
    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Serializer\Expose
     */
    private $mdp;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Maison", mappedBy="utilisateur", orphanRemoval=true)
     */
    private $maisons;
    public function __construct()
    {
        $this->maisons = new ArrayCollection();
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
    public function getPrenom(): ?string
    {
        return $this->prenom;
    }
    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;
        return $this;
    }
    public function getMail(): ?string
    {
        return $this->mail;
    }
    public function setMail(string $mail): self
    {
        $this->mail = $mail;
        return $this;
    }
    public function getMdp(): ?string
    {
        return $this->mdp;
    }
    public function setMdp(string $mdp): self
    {
        $this->mdp = $mdp;
        return $this;
    }
    /**
     * @return Collection|Maison[]
     */
    public function getMaisons(): Collection
    {
        return $this->maisons;
    }
    public function addMaison(Maison $maison): self
    {
        if (!$this->maisons->contains($maison)) {
            $this->maisons[] = $maison;
            $maison->setUtilisateur($this);
        }
        return $this;
    }
    public function removeMaison(Maison $maison): self
    {
        if ($this->maisons->contains($maison)) {
            $this->maisons->removeElement($maison);
            // set the owning side to null (unless already changed)
            if ($maison->getUtilisateur() === $this) {
                $maison->setUtilisateur(null);
            }
        }
        return $this;
    }
}
