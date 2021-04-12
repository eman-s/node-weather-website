const request = require('postman-request')

const geocode = (address, callback) => {

    if (!address) {
        return console.log('Please enter a location address')
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZW1hbjI0MHoiLCJhIjoiY2tuN2t4OGRvMGU2MTJ5cDV2bjgxYXNnMSJ9.DjfLTQYhKCNkpkYVzS50ag&limit=1`

    request({url:url, json: true}, (error, {body} = {}) => {

        const {features} = body

        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (features.length === 0) { 
            callback('Unable to find location, try again with different search term', undefined)

        } else {
            const latitude = features[0].center[1]
            const longitude = features[0].center[0]
            const location = features[0].place_name

            callback(undefined, {latitude, longitude, location })
        }

    })

}

module.exports = geocode