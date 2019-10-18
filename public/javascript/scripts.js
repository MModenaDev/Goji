window.onload = () => {
  const ironhackSP = {
    lat: -23.561762, 
    lng: -46.660191,
   };
    
  const markers = []
    
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: ironhackSP
  });
  
  let center = {
    lat: undefined,
    lng: undefined
  };
    
  function getStores() {
    axios.get("/stores")
     .then(response => {
        placeStores(response.data);
     })
     .catch(error => {
       console.log(error);
     })
   }


  function placeStores(stores){
   stores.forEach((store) => {
     const center = {
       lat: store.location.coordinates[1],
       lng: store.location.coordinates[0]
     };
     const pin = new google.maps.Marker({
       position: center,
       map: map,
     });
     markers.push(pin);
   });
 }
  getStores()
};

var mySwiper = new Swiper ('.prices-container-desk', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

var mySwiper = new Swiper ('.prices-container-mobile', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

var mySwiper2 = new Swiper ('.howWorks-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: '.howWorks-swiper-pagination',
  },

  // Navigation arrows

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
