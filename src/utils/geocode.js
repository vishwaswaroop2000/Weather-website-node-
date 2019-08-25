const request = require('request')
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlzaHdhc3dhcm9vcDIwMDAiLCJhIjoiY2p6am94Y3ZxMGJkaDNucWlhaTd3bjYwdyJ9.z-I1Ki9-wJDnwgcx6DWuJw'
  request({ url, json: true }, (error, { body } = {}) => {//error or response
    if (error)
      callback('Unable to connect to location service.', undefined)
    else if (!
      body.features.length)
      callback('Unable to find location. Try another search.', undefined)
    else
      callback(undefined, {
        latitude:
          body.features[0].center[0],
        longitude:
          body.features[0].center[1],
        location:
          body.features[0].place_name
      })

  })
}

module.exports = geocode