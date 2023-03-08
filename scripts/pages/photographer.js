import { getPhotographer } from "../utils/getData.js";
import { getMedia } from "../utils/getData.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { sortMediaSection } from "../utils/sortMedias.js";
import { photographNameInsert } from "../utils/contactForm.js";
import { countLikes } from "../utils/countLikes.js";
import { createLightBoxMedia } from "../utils/lightBox.js";
import { editDropdown } from "../utils/dropDown.js";
import { displayModal } from "../utils/displayCloseModale.js";
import { closeModal } from "../utils/displayCloseModale.js";


// Fonction qui crée le header de chaque photographe
function createPhotographHeader(photographerElement) {

  // Je destructurise l'objet relatif aux photographes pour extraire les éléments
  const { name, city, country, tagline, portrait } = photographerElement;

  // Je crée la section photographes contenant les éléments
  const photographSection = document.createElement('section');

  photographSection.innerHTML =
  `   <div class="photograph-info">
          <h1 class="photograph-name">${name}</h1>
          <p class="photograph-location">${city}, ${country}</p>
          <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="contact-button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <div class="photograph-portrait">
          <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
      </div>`;

   // J'ajoute une classe à mon élément
   photographSection.classList="photograph-header";

  // J'injecte la section des photographes dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(photographSection);

}

// Fonction qui génère le menu de tri
function createFilterMenu() {
    // Je crée le menu de tri
    const selectDiv = document.createElement('div');

    // J'ajoute une classe à mon élément
    selectDiv.classList="custom-select";
  
    selectDiv.innerHTML =
    ` <p class="select-p">Trier par</p>
      <div class="dropdown" id="select-menu">
        <div class="button-style">
          <button class="sort-btn" aria-haspopup="listbox">Popularité</button>
          <span class="fas fa-chevron-down" id="chevron-down" role='button'></span>
        </div>
        <ul id="dropdown-tri">
          <li class="tri" role='option'>Popularité<span class="fas fa-chevron-up"></span></li>
          <li class="tri" role="option" id="date">Date</li>
          <li class="tri" role="option">Titre</li>
        </ul>
    </div>`

  // J'injecte le menu de sélection dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(selectDiv);

  const openDropDown = document.getElementsByClassName("sort-btn");
  openDropDown[0].addEventListener("click", editDropdown);

  // J'appelle la fonction de tri à chaque click sur mon bouton
  const sortButton = Array.from(document.getElementsByClassName("tri"));
  sortButton.forEach((button) => button.addEventListener("click", sortMediaSection()));

}

// Fonction qui génère la galerie de médias avec un tableau en entrée
export function createMediaSection(array) {
  console.log({array});

  // Je crée la section contenant les médias
  const mediaSection = document.createElement("section");

  // Je parcours mon tableau de médias
  array.forEach((media) => {
    // Je crée un nouvel article pour chacun d'entre eux en appelant ma fonction mediaFactory
    const mediaCardModel = mediaFactory(media);
    // A l'intérieur de ces articles, je crée les éléments de médias grâce à ma fonction getMediaCardDOM
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // J'injecte les nouvelles cards de medias dans ma section medias
    mediaSection.appendChild(mediaCardDOM);
  });

   // J'ajoute une classe à mon élément
   mediaSection.className = "media-section";

  // J'injecte la section de médias dans ma balise main
  const main = document.getElementById("main");
  main.appendChild(mediaSection);

}

// Fonction qui génère le prix en bas de page
export function createFooter(photographPrice) {

  // Je destructurise l'objet relatif aux photographes pour extraire les prix 
  const {price} = photographPrice;

  // Je récupère le contenu de toutes mes div "media-like-count" contenant le nb de likes
  const mediaLikeCount = document.querySelectorAll(".media-like-count");

  // J'initialise une variable de total à zéro
  let totalMediaLikeCount = 0;

  // Je parcours mon tableau de médias
  mediaLikeCount.forEach((media) => {
    // J'additionne le total de tous mes likes pour chaque média
    totalMediaLikeCount += Number(media.textContent);
  });

  // Je crée le HTML de mon footer en intégrant mon total de likes
  const photographFooter = `
    <aside class="footer">
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
      <p>${price} € / jour</p>
    </aside>
  `;

  // J'injecte le footer dans mon HTML
  const footerEl = document.getElementById("footer");
  footerEl.innerHTML = photographFooter;

}

// Fonction qui déclenche les animations de la page
function animations() {

  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", () => {
  displayModal("contactModal");
  });
 
  // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
  button.addEventListener("click", countLikes);
  });

  // J'ajoute un écouteur d'évènement sur chaque bouton de médias pour ouvrir la lightbox au click
  const mediaCardButtons = document.querySelectorAll(".media-button-card");
  mediaCardButtons.forEach((card) => {
      card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      createLightBoxMedia(mediaId);
      // J'ouvre ma modale
      displayModal("lightboxModal");
    });
  });

  // J'ajoute un écouteur d'évènement sur chaque croix de lightbox pour la clôturer au click
  const modalCloseBtn = document.getElementById("lightboxCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
  closeModal("lightboxModal");

  });

}

async function createPhotographerPage(){

// Je récupère les données de mon photographe
const photographerInfo = await getPhotographer();
console.log(photographerInfo);

// Je récupère les médias associés au photographe
const photographerMedia = await getMedia();
console.log(photographerMedia);

// Je crée mon header dans la page de photographes en appelant ma fonction createPhotographHeader
createPhotographHeader(photographerInfo);

// Je crée mon menu de tri
createFilterMenu();

// Je crée mes médias 
createMediaSection(photographerMedia);

// Je crée mon footer
createFooter(photographerInfo);

// J'insère le nom du photographe dans le titre de ma modale de contact
photographNameInsert(photographerInfo);

// J'appelle tous mes écouteurs d'évènement pour déclencher les animations
animations();

}

createPhotographerPage();
