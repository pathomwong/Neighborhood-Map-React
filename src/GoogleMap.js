import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

class GoogleMap extends Component {
   
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
    }

    componentDidMount(){
        let APIKey = 'AIzaSyBWDTSaPS8xHfNCm_BFGwlhFG7Tw9Fvcsg';
        window.initMap = this.initMap;
        loadMapJS(`https://maps.googleapis.com/maps/api/js?key=${APIKey}&v=3&callback=initMap&libraries=places`);
    }

    initMap() {
        let props = this.props;
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 30.307182, lng: -97.755996 },
            zoom: 12
        });
        props.setMap(map);

        let infowindows = [];
        let markers = [];
        var service = new window.google.maps.places.PlacesService(this.props.map);
        var request = {
            location: new window.google.maps.LatLng(30.307182, -97.755996),
            radius: 2700,
            types: ['cafe']

        };
        
        service.nearbySearch(request, function (result, status) {

            let poi = result.map((poi) => {
                let marker = new window.google.maps.Marker(
                    {
                        position: poi.geometry.location,
                        title: poi.name,
                        animation: window.google.maps.Animation.DROP,
                    }
                );
                marker.setMap(map);
                let infowindow = new window.google.maps.InfoWindow({
                    content: `<div><p><strong>${poi.name}</strong></p><p>${poi.vicinity}</p><p calss="by">Address by Google Place</p></div>`
                });

                infowindows.push(infowindow);
                markers.push(marker);
                poi.infowindow = infowindow;
                poi.marker = marker;
                marker.addListener("click", function () {
                    for (var i = 0; i < infowindows.length; i++) {
                        infowindows[i].close();
                    }
                    infowindow.open(map, marker);
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setAnimation(null);
                    }
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                });
                return poi
            });
            props.setPoi(poi); 
        });      
    }

    render(){
        
        return (
            <div id="map"></div>
        );
    }
}

export default GoogleMap;

/**
 * Load the google maps Asynchronously
 * @param {url} url of the google maps script
 */
function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}