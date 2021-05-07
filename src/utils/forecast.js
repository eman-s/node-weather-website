const request = require('postman-request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=3ad7ec364592594eb2f48a190b5380fa&query=${lat},${long}&units=f`

    request({url: url, json: true}, (error, {body} = {}) => {

        const {success, error: queryErr, current} = body
         
        if (error) {
           callback('Unable to connect', undefined) 
        } else if (success === false) {
            callback(queryErr.info, undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, humidity} = current
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is at ${humidity}%.`)
        }
    })
    
}

module.exports = forecast