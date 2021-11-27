/**
 * Get user zoom id
 * @author Chanel Young
 * @return {json} - json with your personal user info
*/
async function get_zoom_id(){
    const axios = require('axios');

    //Token expires 11/30
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IndQTUFNZ1ZiUTYtWDhCMTlqTFJBWnciLCJleHAiOjE2MzgyOTkzMDksImlhdCI6MTYzNzY5NDUwOX0.-UjO_dpJdhKgzZUfC78Vmeod1npAWtst6AkjNUAP2c0"
    let _url = `https://api.zoom.us/v2/users/me`;

    const request = {
        method: 'get',
        url: _url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
        }
      }

    let r = await axios(request)
    .then((response) => {
        return response.data;
    })
    .catch(err => {
        return ({error: err});
    });

    return r;
}
/*
get_zoom_id().then((response) => {
    console.log(response); 
})
*/ 
