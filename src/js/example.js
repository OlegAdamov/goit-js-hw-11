// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;




const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});


// Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
//  Notiflix.Notify.failure("")

