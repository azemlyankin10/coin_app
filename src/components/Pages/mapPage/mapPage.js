const { el, setChildren } = require("redom")
import { Loader } from "@googlemaps/js-api-loader"
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import { getBanks } from "../../Api";
import toast from "../../toast/toast";

const loader = new Loader({
  apiKey: "AIzaSyCAFIJz33kEUsAn-QZtjV_Fak4kY1WI5Mw",
})

const mapPage = async () => {
  let locations = await getBanks().then(res => {
    if(res.error) return toast(res.error, 'error')
    return res.payload
  })
  locations = locations.map(el => {
    return {lat: el.lat, lng: el.lon}
  }) 

  const container = el('main', {class: 'main container map-page'})
  const title = el('h2', {class: 'map-page__title'}, 'Карта банкоматов')
  const map = el('div', {class: 'map-page__map'})

  loader.load().then(() => {
    const gmap = new google.maps.Map(map, {
      center: {lat: 44.878414, lng: 39.190289},
      zoom: 10,
    })

    const markers = locations.map(location => {
      const marker = new google.maps.Marker({
        position: location,
        map: gmap,
      })
      return marker
    })
    new MarkerClusterer({ map, markers });

  })

  setChildren(container, [title, map])
  return container
}
export default mapPage