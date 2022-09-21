import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import ImagesApiContainer from './fetchImages'
import { createImageList } from "./createImageList";
import LoadMoreBtn from "./load-more-btn";

const searchForm = document.querySelector("#search-form");
const inputForm = document.querySelector('[name="searchQuery"]');
const submitBtn = document.querySelector('[type="submit"]');
const gallery = document.querySelector('.gallery');

const imagesApiContainer = new ImagesApiContainer();
var simpleLightbox = new SimpleLightbox('.gallery a', {});
let loadMoreBtn = new LoadMoreBtn({ 
    selector: '[data-action="load-more"]',
    hidden: true,
});
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

let totalHits = ''

function fetchImages() {
    loadMoreBtn.disable();
        imagesApiContainer.fetchImages().then(images => {
            renderGallery(images);
            loadMoreBtn.enable();
            return totalHits = images.totalHits;
        }); 
}   

function onSearch(event) {
    event.preventDefault();
    imagesApiContainer.foto = event.currentTarget.searchQuery.value.trim();
        loadMoreBtn.show();

    if (imagesApiContainer.foto !== '') {
        imagesApiContainer.resetPage();
        clearGallery();
        fetchImages();
    
    setTimeout(() => {
        if (`${totalHits}` === `0`) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        clearGallery();
        loadMoreBtn.hide();
    } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        simpleLightBox();
        };
    }, 400)
    } else {
        Notiflix.Notify.info("Please, Enter your search query.")
        clearGallery();
        loadMoreBtn.hide();
        };
    };
    
    
function onLoadMore() {
    fetchImages();
    setTimeout(() => {
            if (gallery.childNodes.length >= totalHits) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
                loadMoreBtn.hide();
    }
    simpleLightBox.refresh();

    }, 400)
};

function renderGallery(hits) {
    gallery.insertAdjacentHTML('beforeend', createImageList(hits.hits));
    // simpleLightBox.refresh();
};
    
function clearGallery() {
    gallery.innerHTML = '';
};



// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });