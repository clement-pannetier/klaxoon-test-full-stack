<?php

namespace App\Service;

use App\Entity\Vimeo;
use Symfony\Component\HttpClient\HttpClient;

class VimeoLinkProperties
{
	public function getLinkProperties(Vimeo $vimeo)
	{
		$URL = $vimeo->getURL();
		$client = HttpClient::create();
		$response = $client->request('GET', "https://vimeo.com/api/oembed.json?url=" . $URL);
		$content = $response->getContent();
		$content = $response->toArray();
		
		$vimeo->setTitle($content['title']);
		$vimeo->setAuthorName($content['author_name']);
		$vimeo->setDuration($content['duration']);
		$vimeo->setWidth($content['width']);
		$vimeo->setHeight($content['height']);
	}
}
