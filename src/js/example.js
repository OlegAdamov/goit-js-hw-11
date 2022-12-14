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

const containerImg = new ImagesApiContainer();
var simpleLightbox;
simpleLightbox = new SimpleLightbox('.gallery a');

let loadMoreBtn = new LoadMoreBtn({ 
    selector: '[data-action="load-more"]',
    hidden: true,
});
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


let totalHits = ''
let totalPages;

function fetchImages() {
    loadMoreBtn.disable();
        containerImg.fetchImages().then(images => {
            renderGallery(images);
            loadMoreBtn.enable();
            return totalHits = images.totalHits;
        }); 
}   

function onSearch(event) {
    event.preventDefault();
    containerImg.photo = event.currentTarget.searchQuery.value.trim();
    
    if (containerImg.photo === '') {
        Notiflix.Notify.info("Please, Enter your search query.")
        clearGallery();
        loadMoreBtn.hide()
        return;
        }
        try {
            containerImg.resetPage();
            clearGallery();
            
            fetchImages();

            setTimeout(() => {
                if (totalHits !== 0) {
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    simpleLightbox.refresh();
                    loadMoreBtn.show();
                    totalPages = totalHits / containerImg.per_page;

                    if (containerImg.page - 1 >= totalPages) {
                        loadMoreBtn.hide();
                        return;
                    } return;
                } 
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                    clearGallery();
                loadMoreBtn.hide();
                return;
                }, 400);
        } catch (error) {
            console.error(error);
        };
    };
    
    
function onLoadMore() {
    try {
        fetchImages();
        totalPages = totalHits / containerImg.per_page;
        if (containerImg.page >= totalPages) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.hide()
        };
    }
        catch (error) {
        Notiflix.Notify.failure("Oops, something wrong! Please don't cry!")
    };
};


function renderGallery(hits) {
    gallery.insertAdjacentHTML('beforeend', createImageList(hits.hits));
        simpleLightbox.refresh();
};
    
function clearGallery() {
    gallery.innerHTML = '';
};

function smothScroll() {
    const { height: cardHeight } =
        document.querySelector(".gallery--card").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3.9,
    behavior: "smooth",
});
};



// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });