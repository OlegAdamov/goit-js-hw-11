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
// const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const imagesApiContainer = new ImagesApiContainer();
const loadMoreBtn = new LoadMoreBtn({ 
    selector: '[data-action="load-more"]',
    hidden: true,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
// inputForm.addEventListener('input', (event) => fetchImages.response = event.target.value.trim());

function onSearch(event) {
    event.preventDefault();
    imagesApiContainer.foto = event.currentTarget.searchQuery.value.trim();
    if (imagesApiContainer.foto === '') {
        Notiflix.Notify.info("Please, Enter your search query.")
        clearGallery();
    } else {
        loadMoreBtn.show();
        imagesApiContainer.resetPage();
        Notiflix.Notify.success(`Hooray! We found HELP images.`);
        fetchImages()
        clearGallery();
}
    //         // Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    //   
    //          .catch(errror => {
    //         Notiflix.Notify.failure('Oops, there is no category with that');
};

function fetchImages() {
        loadMoreBtn.disable();
        imagesApiContainer.fetchImages().then(images => {
        renderGallery(images);
        loadMoreBtn.enable();
    });
}

function onLoadMore() {
    fetchImages()
};

function renderGallery(hits) {
    gallery.insertAdjacentHTML('beforeend', createImageList(hits));
};
    
function clearGallery() {
    gallery.innerHTML = '';
}

