import React, { Component } from 'react';
import './App.css';
import GoogleMap from './GoogleMap';
import PoiList from './PoiList';
import * as FoursquareAPI from './FoursquareAPI'

class App extends Component {
  state = {
    map : "",
    poi: [
      //This comment will use to remind structure of poi
      // {
      //   name: "The Texas State Capital",
      //   lat: 30.274722,
      //   lng: -97.740556,
      //   address: "1100 Congress Ave, Austin, TX 78701"
      //   infowindow: fn
      //   marker: fn
      // }
    ]
  };

  /**
 * Set map variable to the state, so it can send as prop
 * @param {m} map object
 */
  setMap = (m)=>{
    this.setState({map: m});
  }

  /**
 * build and set POI to the state
 * @param {result} data from google map.
 */
  setPoi = (result) =>{
   
    this.setState({
      poi: result.map((poi)=>{
        
        let place = {};
        place.name = poi.name;
        place.lat = poi.geometry.location.lat();
        place.lng = poi.geometry.location.lng();
        place.address = poi.vicinity;
        place.infowindow = poi.infowindow;
        place.marker = poi.marker;
        return place;
      
    })
    
    })
    this.setPoiFoursquareAddress();
  }

  /**
 * set address that got from foursquare to state [poi]
 */
  setPoiFoursquareAddress = () =>{
    this.setState(this.state.poi.map((place) => {
      FoursquareAPI.get(place.lat, place.lng)
        .then(data => {
          place.address = '';
          if (data.venues){
            place.address = data.venues[0].location.formattedAddress.join(' ');
          }
          place.infowindow.setContent(`<div><p><strong>${place.name}</strong></p><p>${place.address}</p><p calss="by">Address by Foursquare</p></div>`);
          
        });
        return place;
    }))
  }
  /**
 * click event handler
 * @param {poi} the location point
 */
  onclickList = (poi) => {
    this.state.poi.forEach((p)=> {
      p.infowindow.close();
      p.marker.setAnimation(null);
    });

    poi.infowindow.open(this.state.map, poi.marker);
    poi.marker.setAnimation(window.google.maps.Animation.BOUNCE);
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <main id="maincontent" role="main">
          <section id="map-container" role="application" aria-label="Google Map">
            <GoogleMap poiList={this.state.poi} setPoi={this.setPoi} setMap={this.setMap} map={this.state.map}/>
          </section>
          <section id="poi-list-container" aria-label="POI List">
            <PoiList poiList={this.state.poi} onclickList={this.onclickList} map={this.state.map}/>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
