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