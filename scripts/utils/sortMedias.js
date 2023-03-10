import { getMedia } from "./getData.js";
import { closeDropdown } from "./dropDown.js";
import { createMediaSection } from "../pages/photographer.js";
import { countLikes } from "./countLikes.js";
import { createLightBoxMedia } from "./lightBox.js";
import { displayModal } from "./displayCloseModale.js";


// Fonction qui effectue le tri
export async function sortMediaSection() {
    // Je récupère la valeur de l'option sélectionnée
    let newOrder = [];
    let btnSort = document.querySelector(".sort-btn");
    let sortBtn = Array.from(document.getElementsByClassName("tri"));
    const photographerMedia = await getMedia();

  // Je parcours mon tableau de boutons indexés et déclenche la fonction au click
  sortBtn.forEach((btn, index) => btn.addEventListener("click", () => {

    // Si mon tableau est indexé à 0
    if (index == 0) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Popularité";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par ordre décroissant sur le nbe de likes
        return b.likes - a.likes;
      });
    }

    // Si mon tableau est indexé à 1
    if (index == 1) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Date";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par par date ancienne à récente
        return new Date(a.date) - new Date(b.date);
      });
    }

    // Si mon tableau est indexé à 2
    if (index == 2) {
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Titre";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par ordre alphabétique
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }

    // Je récupère ma section de médias et la stocke dans une constante
    const mediaSection = document.getElementsByClassName("media-section");
    // Je supprime ma section de médias
    mediaSection[0].remove();

    // Je fais apparaître ma nouvelle section de médias avec le tri effectué
    createMediaSection(newOrder);

    // Après le tri :

    // J'ajoute un écouteur d'évènement sur chaque bouton de médias pour ouvrir la modale au click 
      const mediaCardButtons = document.querySelectorAll(".media-button-card");
      mediaCardButtons.forEach((card) => {
      card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      // Je crée la lightbox en amont
      createLightBoxMedia(mediaId);
      // J'ouvre ma modale
      displayModal("lightboxModal");
      });
    });

    // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike 
    const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
    mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", countLikes);
    });

    // J'appelle ma fonction closeDropdown pour fermer le menu déroulant
    const sortBtn = Array.from(document.getElementsByClassName("tri"));
    sortBtn.forEach((button) => button.addEventListener("click", closeDropdown()));

  }));
      
  // Je déclenche la fonction en pressant la touche entrée
  sortBtn.forEach((btn, index) => btn.addEventListener("keypress", (event) => {
  
    // Si mon tableau est indexé à 0
    if ((index == 0) && (event.key === "Enter")){
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Popularité";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par ordre décroissant sur le nbe de likes
        return b.likes - a.likes;
      });
    }
  
    // Si mon tableau est indexé à 1
    if ((index == 1) && (event.key === "Enter")){
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Date";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par par date ancienne à récente
        return new Date(a.date) - new Date(b.date);
      });
    }
  
    // Si mon tableau est indexé à 2
    if ((index == 2) && (event.key === "Enter")){
      // Je change l'appelation de mon bouton
      btnSort.innerHTML = "Titre";
      newOrder = photographerMedia.sort((a, b) => {
        // Tri par ordre alphabétique
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
  
    // Je récupère ma section de médias et la stocke dans une constante
    const mediaSection = document.getElementsByClassName("media-section");
    // Je supprime ma section de médias
    mediaSection[0].remove();
  
    // Je fais apparaître ma nouvelle section de médias avec le tri effectué
    createMediaSection(newOrder);
  
    // Après le tri :

    // J'ajoute un écouteur d'évènement sur chaque bouton de médias pour ouvrir la modale au click 
      const mediaCardButtons = document.querySelectorAll(".media-button-card");
      mediaCardButtons.forEach((card) => {
      card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      // Je crée la lightbox en amont
      createLightBoxMedia(mediaId);
      // J'ouvre ma modale
      displayModal("lightboxModal");
      });
    });
  
    // J'ajoute un écouteur d'évènement sur chaque bouton de like pour déclencher la fonction countLike 
    const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
    mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", countLikes);
    });
  
    // J'appelle ma fonction closeDropdown pour fermer le menu déroulant
    const sortBtn = Array.from(document.getElementsByClassName("tri"));
    sortBtn.forEach((button) => button.addEventListener("click", closeDropdown()));
  
  }));
  
}