import axios from 'axios';

    const API_KEY = '29774264-5f2b4531b82822efbb7185623';
    const BASE_URL = 'https://pixabay.com/api/';


export default class ImagesApiContainer {
    constructor() {
        this.searchPhoto = '';
        this.page = 1;
        this.per_page = 40;
     }

fetchImages() {

    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchPhoto}&page=${this.page}&per_page=${this.per_page}&lang=en,ua,ru&image_type=photo&orientation=horizontal&safesearch=true;`)
        .then(function (response) {
        if (!response === 200) {
      throw new Error(response.status);
    }
        return response.data;
    })
        .then(hits => {
            this.incrementPage()
            return hits;
        })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response)
        };
    });
    }

    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get photo() {
    return this.searchPhoto;
}

set photo(newPhoto) {
    this.searchPhoto = newPhoto;
}
};

// console.log('fetchImages', fetchImages("cat"))


// axios({
//     method: 'get',
//     url: 'https://pixabay.com/api/',
//     param:
//     {
//         key: '29774264-5f2b4531b82822efbb7185623',
//         q: 'cat',
//         page: 1,
//         per_page: 40,
//         lang: en, ua, ru,
//         image_type: photo,
//         orientation: horizontal,
//         safesearch: true,
//     },
    // headers: {
    //     'Content-Type': 'application/json',
        
    // },

    //   responseType: 'stream'
// })


// ${BASE_URL}/?key=${API_KEY}&q=${}&page=1&per_page=40&lang=en,ua,ru&image_type=photo&
// orientation=horizontal&safesearch=true;
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// })