import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
// import { fetchImages } from "./fetchImages";
// import axios from 'axios';
// import FetchImages from "./fetchImages";
import ImagesApiContainer from './fetchImages'


const searchForm = document.querySelector("#search-form");
const inputForm = document.querySelector('[name="searchQuery"]');
const submitBtn = document.querySelector('[type="submit"]');
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiContainer = new ImagesApiContainer();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
// inputForm.addEventListener('input', (event) => fetchImages.response = event.target.value.trim());

// const searchInput = document.querySelector(".search-input")


function onSearch(event) {
    event.preventDefault();


    imagesApiContainer.foto = event.currentTarget.searchQuery.value;
    imagesApiContainer.fetchImages(searchFoto);

    // resetMarkup();
    // fetchImages(searchFoto)
    //     .then(foto => {
    //         // if (foto.length < 1) {
    //         // Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
    //         // };
    //         console.log("Congratulation!!!")
    //         renderGallery(foto)
    //     })
    //     .catch(errror => {
    //         Notiflix.Notify.failure('Oops, there is no category with that');
    //         resetMarkup();
    //     })
};

    function onLoadMore() {
        imagesApiContainer.fetchImages(searchFoto);

    
    
};

// function renderGallery(foto) {
//     const list = createImageList(foto);
//     gallery.innerHTML = list;
// };
    
// function createImageList(foto) {
//     return foto.map(({ webformatURL, tags, likes, views, comments, downloads }) => 
//     `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>`
//     )
//     .join("")
// };



// function resetMarkup() {
//     gallery.innerHTML = '';
// };