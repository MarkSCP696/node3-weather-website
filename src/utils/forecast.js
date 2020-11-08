const request = require("request");

const forecast = (lat,long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c0d723b2ea8d84e102ddf286715a838f&query="+lat+","+long+"&units=f";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
        callback("unespected connection error",undefined);
    } else if (body.error) {
        callback("Unable to find location",undefined);
    } else {
      let current = body.current;
      const data ={
          temp : current.temperature,
          isLike :  current.feelslike
      }
      callback(undefined,"Its " +current.temperature +" and I feel like " +  current.feelslike);
    }
  });
};
module.exports = forecast