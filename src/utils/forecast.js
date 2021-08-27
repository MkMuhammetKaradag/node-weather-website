import request from 'request'
const forecast = (latitude,longitude,callback) => {

    const url = `http://api.weatherstack.com/current?access_key=13e95db7be6fc841306d2fdebba8a738&query=${latitude},${longitude}`

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("unable  to connect  to weathear services ",undefined)
        } else if (body.error) {
            callback('unable  to find location ',undefined)
        } else {
            console.log(body.current.weather_descriptions[0])
           callback(undefined,(body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degress out. it  feels like ' + body.current.feelslike + " degreess out.the humidity is"+body.current.humidity+"%."))

        }

    })
}
export default forecast


// const url = 'http://api.weatherstack.com/current?access_key=13e95db7be6fc841306d2fdebba8a738&query=37.8267,-122.4233&units=c'

// request({ url: url, json: true }, (error, response) => {
//     // console.log(response.body.current)
//     if (error) {
//         console.log("error ")
//     } else if (response.body.error){
//         console.log('unable  to find location ')
//     }else {
//         console.log(response.body.current.weather_descriptions[0] + '. it is current ' + response.body.current.temperature + ' degress out, it  feels likes  ' + response.body.current.feelslike + " degreess out")

//     }

// })