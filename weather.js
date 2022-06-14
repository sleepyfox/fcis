// Get weather from external REST API and store it in a file
const fs = require('fs')
const axios = require('axios').default
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?appid='
const API_KEY = process.env['API_KEY'] || 'fail'
const SEPERATOR = '&q='

module.exports = {
  main: async function(context) {
    let city = ''
    if (context && context?.city) {
      city = context.city
    } else {
      city = 'london'
    }
    try {
      const res = await axios.get(WEATHER_URL + API_KEY + SEPERATOR + city)
      console.log('getting weather for city', city)
      if (res.status === 200) {
        console.log('weather data is: ', res.data)
        let today = new Date()
        today = today.toISOString().slice(0,10)
        fs.writeFileSync('weather-' + today + '.json', JSON.stringify(res.data))
        console.log('wrote weather for', city)
        return (city)
      } else {
        console.log('error occurred, status =', res.status)
        return ('error')
      }
    } catch (err) {
      console.log('an error occurred getting the weather', err)
      return ('error')
    }
  }
}
