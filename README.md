# Bookmark Manager
---

Cette application a été développée dans le cadre d'un test de connaisances pour le métier de développeur Web Full Stack chez [Klaxoon](https://klaxoon.com/fr/).

![alt-text](https://klaxoon.com/static/_/apple-icon-60x60-85cd74a2aac619d478636b7637fcc05d.png)


## Stack technique
+ Client : React.js (React Router) / Bootstrap / Font Awesome
+ API : Symfony v4.4.1 / API Platform v2.5.3 / Doctrine v2.0.2

## Instructions d'installation du client
1. Dans le dossier du client (bookmark-manager-client) lancez cette commande :
    `
      yarn install
    `
2. Créez un nouveau fichier ".env.local" à la racine du dossier et ajoutez ces lignes :
    REACT_APP_API_ENTRYPOINT=http://localhost:8000/
    REACT_APP_ENTRYPOINT=http://localhost:3000
    PORT=3000
3. Lancez cette commande pour démarrer l'application
    `
      yarn start
    `

## Instructions d'installation du serveur
1. Dans le dossier du serveur (bookmark-manager-api) lancer cette commande :
    `
      composer install
    `
2. Créez un nouveau fichier ".env.local" à la racine du dossier et paramétrez cette ligne :
    `
      DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/bookmark-manager
    `
3. Exécutez ces commandes
    `
      php bin/console doctrine:database:create
    `
    `
      php bin/console doctrine:schema:create
    `
4. Lancez un serveur local avec l'une de ces deux commandes :
    `
      symfony server:start -d
    `
    Ou :
    `
      composer require symfony/web-server-bundle --dev
    `
    `
      php bin/console server:start 127.0.0.1:8000
    `
5. Ajoutez autant de mots-clés souhaités en base de données en remplacant "<nom_mot-cle>" par le mot-clé choisi :
    `
      curl -H "Content-Type: application/ld+json" -X POST -d '{"name": "<nom_mot_cle>", "vimeos": [], "flickrs": []}' http://localhost:8000/keywords
    `

## Fonctionnalités
- Ajouter des favoris pour les sites vimeo.com et flickr.com avec l'URL de la ressource
- Récupération automatique des autres données de la ressource
- Afficher les détails d'un favori
- Modifier un favori (URL et association de mots-clés)
- Suppression d'un favori

## Fonctionnalités futures
- Pagination des favoris (actuellement affichage des 100 premiers via la variable "items_per_page" d'API Platform)
- Ajout de nouveaux mots-clés (formulaire)
- Suppression de mots-clés associés à un favori

## Bugs connus
- L'association d'un mot-clé à un favori ne fonctionne pas correctement sur le client
- La page n'est pas rechargée automatiquement lors de l'association d'un mot-clé à un favori

## Démonstration
Le client et l'API sont accessibles en ligne à travers ces liens :
- [Client](https://bookmark-manager-client.netlify.com/) : Hébergé grâce à [Netlify](https://www.netlify.com/)
- [API](https://bookmark-manager-api.herokuapp.com/) : Hébergé grâce à [Heroku](https://heroku.com/)
