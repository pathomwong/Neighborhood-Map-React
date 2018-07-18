
const id = 'W1WQ51XDD5L4FXY0R5S0DANGOMRTMOV1FA4ANSGBHHDTO10E'
const secret = 'JJQS4YBLTCN0RZJ1W1CW0LPKCNN1SRV3J03CEFV0RVPN2PML'

/**
 * Load data from foursquare api Asynchronously
 * @param {lat} latitude
 * * @param {lng}  longitude
 */

export const get = (lat, lng) =>{
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${id}&client_secret=${secret}&v=20130815&ll=${lat},${lng}&limit=1`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data.response)
        .catch(err => '[FoursquareAPI] Error:'+ err);
}