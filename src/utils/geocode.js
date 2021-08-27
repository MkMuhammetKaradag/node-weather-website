import request from 'request'
const geocode=(address,callback)=>{
    
    const uriadrress=encodeURIComponent(address)
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+uriadrress+'.json?access_token=pk.eyJ1IjoibWstZGVuZW1lIiwiYSI6ImNrc3JhaHE3azA5ZTAyd3VtYXJ6c2k0bnkifQ.4SNXHsHvkrzN9X2Yxw45fg'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            console.log("girdi")
            callback('nable to connect service',undefined)
        }else if(body.features.length===0){
            callback('unable to  find location  try another search',undefined)
        } else{
            const latitude=body.features[0].center[0]
            const longitude=body.features[0].center[1]
            const location=body.features[0].place_name
            callback(undefined,{latitude,longitude,location})
        }
       
    })
}
export default geocode
