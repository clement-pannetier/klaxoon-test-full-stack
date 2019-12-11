<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource
 * @ORM\Entity
 * @UniqueEntity(fields="name", message="Ce mot clé est déjà pris.")
 */
class Keyword
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Vimeo", inversedBy="keywords")
     */
    private $vimeos;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Flickr", inversedBy="keywords")
     */
    private $flickrs;

    public function __construct()
    {
        $this->vimeos = new ArrayCollection();
        $this->flickrs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Vimeo[]
     */
    public function getVimeos(): Collection
    {
        return $this->vimeos;
    }

    public function addVimeo(Vimeo $vimeo): self
    {
        if (!$this->vimeos->contains($vimeo)) {
            $this->vimeos[] = $vimeo;
        }

        return $this;
    }

    public function removeVimeo(Vimeo $vimeo): self
    {
        if ($this->vimeos->contains($vimeo)) {
            $this->vimeos->removeElement($vimeo);
        }

        return $this;
    }

    /**
     * @return Collection|Flickr[]
     */
    public function getFlickrs(): Collection
    {
        return $this->flickrs;
    }

    public function addFlickr(Flickr $flickr): self
    {
        if (!$this->flickrs->contains($flickr)) {
            $this->flickrs[] = $flickr;
        }

        return $this;
    }

    public function removeFlickr(Flickr $flickr): self
    {
        if ($this->flickrs->contains($flickr)) {
            $this->flickrs->removeElement($flickr);
        }

        return $this;
    }
}
