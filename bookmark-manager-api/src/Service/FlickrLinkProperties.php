<?php

namespace App\Service;

use App\Entity\Flickr;
use Symfony\Component\HttpClient\HttpClient;

class FlickrLinkProperties
{
	public function getLinkProperties(Flickr $flickr)
	{
		$URL = $flickr->getURL();
		$client = HttpClient::create();
		$response = $client->request('GET', "http://www.flickr.com/services/oembed/?format=json&url=" . $URL);
		$content = $response->getContent();
		$content = $response->toArray();
		
		$flickr->setTitle($content['title']);
		$flickr->setAuthorName($content['author_name']);
		$flickr->setWidth($content['width']);
		$flickr->setHeight($content['height']);
	}
}
