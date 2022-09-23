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

console.log(`containerImg.searchPhoto: `, containerImg.searchPhoto)
console.log(`containerImg.page: `, containerImg.page)
console.log(`containerImg.per_page: `, containerImg.per_page)

let loadMoreBtn = new LoadMoreBtn({ 
    selector: '[data-action="load-more"]',
    hidden: true,
});
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


let totalHits = ''

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
    
    if (containerImg.photo !== '') {
        console.log('onSearch ~ containerImg.photo', containerImg.photo)
        try {
            containerImg.resetPage();
            clearGallery();
            
            fetchImages();
            setTimeout(() => {
                console.log('onSearch ~ totalHits', totalHits)
                // console.log('onSearch ~ totalHits', result.totalHits)
                if (totalHits === 0) {
                    Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
                    clearGallery();
                    loadMoreBtn.hide();
                } else {
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    simpleLightbox.refresh();
                    loadMoreBtn.show();
                    return;
                }
            }, 400);
        } catch (error) {
            console.error(error);
        }
    } else {
        Notiflix.Notify.info("Please, Enter your search query.")
        clearGallery();
        loadMoreBtn.hide()
        return;
        };
    };
    
    
function onLoadMore() {
    try {
        fetchImages();

        console.log('onLoadMore ~ containerImg.page: ', containerImg.page)

        const totalPages = totalHits / containerImg.per_page;

        console.log('onLoadMore ~ totalHits', totalHits)
        console.log('onLoadMore ~ containerImg.per_page', containerImg.per_page)
        console.log('onLoadMore ~ totalPages', totalPages)

        if (containerImg.page >= totalPages) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.hide()
        }
       console.log(`Hello`);
    }
   
   catch (error) {
        Notiflix.Notify.failure("Oops, something wrong! Please don't cry!")
        console.log('onLoadMore ~ failure')
    };
        
};


function renderGallery(hits) {
    gallery.insertAdjacentHTML('beforeend', createImageList(hits.hits));
        simpleLightbox.refresh();
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