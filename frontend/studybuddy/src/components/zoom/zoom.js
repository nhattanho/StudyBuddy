function create_zoom(userid, _starttime){
    const axios = require('axios');

    //Token expires 11/1
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IndQTUFNZ1ZiUTYtWDhCMTlqTFJBWnciLCJleHAiOjE2MzU3OTc4MDgsImlhdCI6MTYzNTE5MzAwOH0.XhHHkPMFn1eAMY2TAfppSguLK7-aQxU_tvCZtBVXcOI"

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
