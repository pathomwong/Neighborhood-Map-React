
const id = 'W1WQ51XDD5L4FXY0R5S0DANGOMRTMOV1FA4ANSGBHHDTO10E'
const secret = 'JJQS4YBLTCN0RZJ1W1CW0LPKCNN1SRV3J03CEFV0RVPN2PML'


// const headers = {
//     'Accept': 'application/json',
//     'Authorization': token
// }


export const get = (lat, lng) =>{
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${id}&client_secret=${secret}&v=20130815&ll=${lat},${lng}&limit=1`;
    console.log(url);
    return fetch(url)
        .then(response => response.json())
        .then(data => data.response)
        .catch(err => '');
        //console.log(data.response.venues[0].location.formattedAddress.join(' '));

}