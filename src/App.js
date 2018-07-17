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

  setMap = (m)=>{
    this.setState({map: m});
  }

  setPoi = (result) =>{
   
    this.setState({
      poi: result.map((poi)=>{
        
        let place = {};
        place.name = poi.name;
        place.lat = poi.geometry.location.lat();
        place.lng = poi.geometry.location.lng();
        place.address = poi.vicinity;
        //FoursquareAPI.get(place.lat, place.lng).then(data => place.address = data.venues[0].location.formattedAddress.join(' '));
        place.infowindow = poi.infowindow;
        place.marker = poi.marker;
        return place;
      
    })
    //console.log(this.state);
    
    })
    this.setPoiFoursquareAddress();
    //console.log('setPoi');
    //console.log(this.state);
  }

  setPoiFoursquareAddress = () =>{
    console.log('setPoiFoursquareAddress');
    this.setState(this.state.poi.map((place) => {
      FoursquareAPI.get(place.lat, place.lng)
        .then(data => {
          place.address = '';
          if (data.venues){
            place.address = data.venues[0].location.formattedAddress.join(' ');
          }
          place.infowindow.setContent(`<div><p><strong>${place.name}</strong></p><p>${place.address}</p></div>`);
          //console.log(place.address);
          
        });
        return place;
    }))
  }
  onclickList = (poi) => {
    //console.log(poi.name);
    this.state.poi.forEach((p)=> {
      p.infowindow.close();
    });

    poi.infowindow.open(this.state.map, poi.marker);
    
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
        {/* <footer>
          Copyright (c) 2018 <a href="/"><strong>Neighborhood Map</strong></a> All Rights Reserved.
        </footer> */}
      </div>
    );
  }
}

export default App;
