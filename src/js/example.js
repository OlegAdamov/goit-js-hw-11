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
let simpleLightbox = new SimpleLightbox('.gallery a', {});
let loadMoreBtn = new LoadMoreBtn({ 
    selector: '[data-action="load-more"]',
    hidden: true,
});
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();
    imagesApiContainer.foto = event.currentTarget.searchQuery.value.trim();
    if (imagesApiContainer.foto === '') {
        Notiflix.Notify.info("Please, Enter your search query.")
        clearGallery();
    loadMoreBtn.hide();

    // } else if (imagesApiContainer.hits === {}) {
    //   Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
        
    }
    else {
        loadMoreBtn.show();
        imagesApiContainer.resetPage();
        fetchImages();
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found some images.`);
        clearGallery();
} 
    //   Notiflix.Notify.failure('Oops, there is no category with that');
    //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")

};

function fetchImages() {
    loadMoreBtn.disable();
   imagesApiContainer.fetchImages().then(images => {
        renderGallery(images);
        loadMoreBtn.enable();
    });
};

function onLoadMore() {
    simpleLightBox.destroy();
    fetchImages();
};

function renderGallery(hits) {
    gallery.insertAdjacentHTML('beforeend', createImageList(hits));
    // console.log('renderGallery ~ hits', this.totalHits);
simpleLightBox = new SimpleLightbox('.gallery a').refresh();
};
    
function clearGallery() {
    gallery.innerHTML = '';
};

