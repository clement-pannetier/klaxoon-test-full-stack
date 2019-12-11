<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Flickr;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Service\FlickrLinkProperties;

final class FlickrPostSubscriber implements EventSubscriberInterface
{
    private $flickrLinkProperties;

    public function __construct(FlickrLinkProperties $flickrLinkProperties)
    {
        $this->flickrLinkProperties = $flickrLinkProperties;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['updateFlickrEntity', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function updateFlickrEntity(ViewEvent $event)
    {
        $flickr = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$flickr instanceof Flickr || Request::METHOD_POST !== $method && Request::METHOD_PUT !== $method) {
            return;
        }

        $this->flickrLinkProperties->getLinkProperties($flickr);
    }
}