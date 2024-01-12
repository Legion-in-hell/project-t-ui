# Projet T\*

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/)
- NPM (installé avec Node.js)
- [Git](https://git-scm.com/)

## Installation

Pour installer le projet, suivez ces étapes :

1. Clonez le dépôt (idéalement sur le bureau) :

   ```bash
   git clone https://github.com/Legion-in-hell/Projet-T-.git
   cd Projet-T-
   ```

2. Installez les dépendances NPM :

   ```bash
   npm install
   ```

3. Rendez vous sur le [générateur de clé Oauth twitch](https://twitchapps.com/tmi/) pour générer votre clé.

4. Créez un fichier .env à la racine du projet et ajoutez vos variables d'environnement :

```
TWITCH_OAUTH=votre_clé_secrète_à_ne_jamais_partager!
TWITCH_NAME=votre_pseudo_twitch_tout_en_minuscule

```

5. Lancer le serveur :

```bash
npm start
```

6. Rendez-vous sur le serveur :

http://localhost:3000
