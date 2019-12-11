import { API_ENTRYPOINT } from '../config/config';
const MIME_TYPE = 'application/ld+json';

export function fetchAPI(id, options = {}) {
  if ('undefined' === typeof options.headers)
    options.headers = new Headers();
  if (null === options.headers.get('Accept'))
    options.headers.set('Accept', MIME_TYPE);
  if (
    'undefined' !== options.body &&
    !(options.body instanceof FormData) &&
    null === options.headers.get('Content-Type')
  )
    options.headers.set('Content-Type', MIME_TYPE);

  return fetch(new URL(id, API_ENTRYPOINT), options).then((response) => {
    if (response.ok) {
      if (options.method !== 'DELETE') return response.json(); // Requête "DELETE" => Aucun contenu renvoyé par l'API
      else return response;                                    // donc .json() génère une erreur (SyntaxError)
    }

    return response.json().then(
      (json) => {
        const error = json['hydra:description'] || json['hydra:title'] || 'An error occurred.';
        throw new Error(error);
      }
    );
  });
}