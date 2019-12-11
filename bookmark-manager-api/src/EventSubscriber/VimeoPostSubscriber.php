<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Vimeo;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Service\VimeoLinkProperties;

final class VimeoPostSubscriber implements EventSubscriberInterface
{
    private $vimeoLinkProperties;

    public function __construct(VimeoLinkProperties $vimeoLinkProperties)
    {
        $this->vimeoLinkProperties = $vimeoLinkProperties;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['updateVimeoEntity', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function updateVimeoEntity(ViewEvent $event)
    {
        $vimeo = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$vimeo instanceof Vimeo || Request::METHOD_POST !== $method && Request::METHOD_PUT !== $method) {
            return;
        }

        $this->vimeoLinkProperties->getLinkProperties($vimeo);
    }
}