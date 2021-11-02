/**
 * Creates a zoom meeting 
 * @param {string} userid - user's unique zoom id
 * @param {string} _starttime - the start time of the zoom meeting, formatted yyyy-MM-ddTHH:mm:ssZ
 * @return {json} - json with meeting information, schema here: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
 */
function create_zoom(userid, _starttime){
    const axios = require('axios');

    //Token expires 11/9
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IndQTUFNZ1ZiUTYtWDhCMTlqTFJBWnciLCJleHAiOjE2MzY0OTYxMTUsImlhdCI6MTYzNTg4NzcxNX0.UckJXffHDAh64oJ58LqUIE7c53hYTnzWdNL-dXnJMVM"

    let _url = `https://api.zoom.us/v2/users/${userid}/meetings`

    const request = {
        method: 'post',
        url: _url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
        }, 
        data: {
            start_time: _starttime,
        }
      }

    axios(request)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

//console.log(create_zoom("kedFd6VrQnmJPvoFnA1Y9w", "2020-03-31T12:02:00Z"))
