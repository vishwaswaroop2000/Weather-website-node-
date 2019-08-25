const request = require('request')
// const geocodeURL = "https://api.darksky.net/forecast/f1eb640d503105b0cf67a36b6dd9d0e4/"
// const forecast = request({url:geocodeURL,json:true})
const forecast = (longitude, latitude, callback) => {
  const url = "https://api.darksky.net/forecast/f1eb640d503105b0cf67a36b6dd9d0e4/" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude) + "?units=si"
  request({ url, json: true }, (error, { body } = {}) => {
    if (error)
      callback('Unable to connect to network', undefined)
    else if (body.error)
      callback('Unable to find loaction', undefined) // executes whatever function sent as parameter
    else
      callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.apparentTemperature + " degrees Celcius out. There is a " + body.currently.precipProbability + "% of rain. The highest temperature should not exceed " + body.daily.data[0].temperatureMax + " degrees Celcius. The lowest temperature should not be below " + body.daily.data[0].temperatureMin + " degree Celcius.")
  })
}

module.exports = forecast