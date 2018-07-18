import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class PoiList extends Component {
    state = {
        query: ''
    }

     /**
     * set query string to state
     * @param {query} query string from textbox
     */
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

     /**
     * Clear query string in state
     */
    clearQuery = () => {
        this.setState({ query: '' });
    }

    render(){
        const poiList = this.props.poiList;
        poiList.forEach((poi) => {
            poi.infowindow.close();
            poi.marker.setMap(null);
        })
        const { query } = this.state;
        let showingPoi;
        if (query) {
            //filter the location
            const match = new RegExp(escapeRegExp(query), 'i');
            showingPoi = poiList.filter((poi) => match.test(poi.name))
        } else {
            showingPoi = poiList;
        }

        showingPoi.sort(sortBy('name'));
        showingPoi.forEach((poi) => {
            //set animation on selected point
            poi.marker.setAnimation(window.google.maps.Animation.DROP)
            poi.marker.setMap(this.props.map);
        })

        return(
            <div>
                <div id="search">
                    <input id="search-textbox" type="text" placeholder="Search" onChange={(event) => this.updateQuery(event.target.value)} role="search"
                        aria-labelledby="search"/>
                </div>
                <div id="poi-list">
                    <ul>
                        {showingPoi.map((poi, index) => (
                            <li key={index} onClick={() => this.props.onclickList(poi)} role="button" tabIndex="0">
                                    <h3>{poi.name}</h3>
                                    <p>{poi.address}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default PoiList;