# 🎨 Heros

** Heros ** est un thème WordPress personnalisé, test avec un workflow basé sur **Gulp** pour automatiser le build, et un plugin **heros-metaboxes** pour gérer les champs et options spécifiques.

---

## 🗂️ Structure du projet

- themes/heros/               => Thème principal WordPress
- plugins/heros-metaboxes/     => Plugin WordPress pour les metaboxes
- gulpfile.js               => Configuration Gulp

---

## ⚙️ Prérequis

Avant de commencer, tu dois avoir :

- **WordPress** installé localement (MAMP, LocalWP, Lando, etc.)
- **Node.js** `>=18.x`
- **pnpm / npm / yarn**
- **Gulp CLI** installé globalement :
  ```bash
  npm install --global gulp-cli

---

## ⚙️ Installation
- Aller dans le dossier wp-content :
  ```bash
  cd wp-content
  # 1) Cloner dans le wp-content de wordpresss dans dossier temporaire
  git clone https://github.com/justprog973/heros.git temp-repo
  
  # 2) Copier le theme et le plugin
  cp -rn temp-repo/plugins/* wp-content/plugins/
  cp -rn temp-repo/themes/* wp-content/themes/
  
  # 3) Nettoyer
  rm -rf temp-repo
  
  cd themes/heros
  pnpm i
  pnpm start
  ````
---

## ⚡ Scripts

Ton `package.json` contient ces scripts pour gérer le workflow Gulp :
  ```json
  "scripts": {
    "start": "gulp",
    "build": "gulp build --prod",
    "bundle": "gulp bundle --prod"
  }
  ````